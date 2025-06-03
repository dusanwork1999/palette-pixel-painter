
// Color conversion utilities
class ColorUtils {
    static hsbToHex(h, s, b) {
        const hNorm = h / 360;
        const sNorm = s / 100;
        const bNorm = b / 100;

        const c = bNorm * sNorm;
        const x = c * (1 - Math.abs(((hNorm * 6) % 2) - 1));
        const m = bNorm - c;

        let r = 0, g = 0, blue = 0;

        if (hNorm >= 0 && hNorm < 1/6) {
            r = c; g = x; blue = 0;
        } else if (hNorm >= 1/6 && hNorm < 2/6) {
            r = x; g = c; blue = 0;
        } else if (hNorm >= 2/6 && hNorm < 3/6) {
            r = 0; g = c; blue = x;
        } else if (hNorm >= 3/6 && hNorm < 4/6) {
            r = 0; g = x; blue = c;
        } else if (hNorm >= 4/6 && hNorm < 5/6) {
            r = x; g = 0; blue = c;
        } else {
            r = c; g = 0; blue = x;
        }

        const rInt = Math.round((r + m) * 255);
        const gInt = Math.round((g + m) * 255);
        const bInt = Math.round((blue + m) * 255);

        return `#${rInt.toString(16).padStart(2, '0')}${gInt.toString(16).padStart(2, '0')}${bInt.toString(16).padStart(2, '0')}`.toUpperCase();
    }

    static hexToHsb(hex) {
        const cleanHex = hex.replace('#', '');
        
        if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
            return { h: 0, s: 50, b: 50 };
        }

        const r = parseInt(cleanHex.substr(0, 2), 16) / 255;
        const g = parseInt(cleanHex.substr(2, 2), 16) / 255;
        const b = parseInt(cleanHex.substr(4, 2), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;

        let h = 0;
        const s = max === 0 ? 0 : (diff / max) * 100;
        const brightness = max * 100;

        if (diff !== 0) {
            switch (max) {
                case r:
                    h = ((g - b) / diff + (g < b ? 6 : 0)) * 60;
                    break;
                case g:
                    h = ((b - r) / diff + 2) * 60;
                    break;
                case b:
                    h = ((r - g) / diff + 4) * 60;
                    break;
            }
        }

        return { h: Math.round(h), s: Math.round(s), b: Math.round(brightness) };
    }

    static hexToRgba(hex, opacity) {
        if (hex.startsWith('#') && hex.length === 7) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
        }
        return hex;
    }
}

// Canvas drawing utility
class CanvasUtils {
    static drawGradient(canvas, hue) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Create the gradient from white to the pure hue
        const saturationGradient = ctx.createLinearGradient(0, 0, width, 0);
        saturationGradient.addColorStop(0, 'white');
        saturationGradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);

        ctx.fillStyle = saturationGradient;
        ctx.fillRect(0, 0, width, height);

        // Create the brightness gradient (black overlay)
        const brightnessGradient = ctx.createLinearGradient(0, 0, 0, height);
        brightnessGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        brightnessGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

        ctx.fillStyle = brightnessGradient;
        ctx.fillRect(0, 0, width, height);
    }
}
