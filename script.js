class ColorPicker {
    constructor() {
        this.hsb = { h: 0, s: 79, b: 94 }; // Default to #F04343
        this.opacity = 100;
        this.isDragging = false;
        this.dragType = null;
        this.isModalOpen = false;
        
        // 선택된 색상을 저장하는 변수들 (메인 화면에 표시되는 값들)
        this.selectedHsb = { h: 0, s: 79, b: 94 };
        this.selectedOpacity = 100;
        
        this.themeColors = [
            '#3B82F6', '#8B5CF6', '#EC4899', '#F43F5E', 
            '#F97316', '#84CC16', '#EF4444'
        ];
        
        this.initializeElements();
        this.bindEvents();
        this.updateMainDisplay();
        this.initializeThemeColors();
    }
    
    initializeElements() {
        // Main elements
        this.openBtn = document.getElementById('openColorPicker');
        this.colorPreview = document.getElementById('colorPreview');
        this.positionX = document.getElementById('positionX');
        this.positionY = document.getElementById('positionY');
        this.selectedHex = document.getElementById('selectedHex');
        this.selectedOpacityInput = document.getElementById('selectedOpacity');
        
        // Modal elements
        this.modal = document.getElementById('colorPickerModal');
        this.modalContent = document.getElementById('colorPickerContent');
        this.gradientCanvas = document.getElementById('gradientCanvas');
        this.colorSelector = document.getElementById('colorSelector');
        this.eyedropperBtn = document.getElementById('eyedropperBtn');
        this.hueSlider = document.getElementById('hueSlider');
        this.hueHandle = document.getElementById('hueHandle');
        this.opacitySlider = document.getElementById('opacitySlider');
        this.opacityHandle = document.getElementById('opacityHandle');
        this.customColorPreview = document.getElementById('customColorPreview');
        this.hexInput = document.getElementById('hexInput');
        this.opacitySpinner = document.getElementById('opacitySpinner');
        this.themeColorsGrid = document.getElementById('themeColorsGrid');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.selectBtn = document.getElementById('selectBtn');
    }
    
    bindEvents() {
        // Main interface events
        this.openBtn.addEventListener('click', () => this.openModal());
        this.positionX.addEventListener('change', () => this.updateModalPosition());
        this.positionY.addEventListener('change', () => this.updateModalPosition());
        
        // Modal events
        this.cancelBtn.addEventListener('click', () => this.closeModal());
        this.selectBtn.addEventListener('click', () => this.selectColor());
        
        // Canvas events
        this.gradientCanvas.addEventListener('mousedown', (e) => this.startCanvasDrag(e));
        
        // Slider events
        this.hueSlider.addEventListener('mousedown', (e) => this.startSliderDrag(e, 'hue'));
        this.opacitySlider.addEventListener('mousedown', (e) => this.startSliderDrag(e, 'opacity'));
        
        // Global mouse events
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', () => this.stopDrag());
        
        // Input events
        this.hexInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // 폼 제출 방지
                this.handleHexInput();
            }
        });
        this.hexInput.addEventListener('blur', () => this.handleHexInput());
        
        // Opacity spinner events
        this.opacitySpinner.addEventListener('input', () => this.handleOpacitySpinner());
        this.opacitySpinner.addEventListener('change', () => this.handleOpacitySpinner());
        
        // Eyedropper
        this.eyedropperBtn.addEventListener('click', () => this.handleEyedropper());
    }
    
    openModal() {
        this.isModalOpen = true;
        this.modal.classList.remove('hidden');
        // 현재 선택된 값을 모달의 작업 값으로 설정
        this.hsb = { ...this.selectedHsb };
        this.opacity = this.selectedOpacity;
        this.updateModalPosition();
        this.updateCanvas();
        this.updateModalDisplay();
    }
    
    closeModal() {
        this.isModalOpen = false;
        this.modal.classList.add('hidden');
    }
    
    updateModalPosition() {
        const x = parseInt(this.positionX.value) || 0;
        const y = parseInt(this.positionY.value) || 0;
        this.modalContent.style.marginLeft = `${x}px`;
        this.modalContent.style.marginTop = `${y}px`;
    }
    
    startCanvasDrag(e) {
        e.preventDefault();
        this.isDragging = true;
        this.dragType = 'canvas';
        this.handleCanvasMove(e);
    }
    
    startSliderDrag(e, type) {
        e.preventDefault();
        this.isDragging = true;
        this.dragType = type;
        this.handleSliderMove(e, type);
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        switch (this.dragType) {
            case 'canvas':
                this.handleCanvasMove(e);
                break;
            case 'hue':
                this.handleSliderMove(e, 'hue');
                break;
            case 'opacity':
                this.handleSliderMove(e, 'opacity');
                break;
        }
    }
    
    handleCanvasMove(e) {
        const rect = this.gradientCanvas.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
        
        this.hsb.s = (x / rect.width) * 100;
        this.hsb.b = 100 - (y / rect.height) * 100;
        
        this.updateModalDisplay();
    }
    
    handleSliderMove(e, type) {
        const slider = type === 'hue' ? this.hueSlider : this.opacitySlider;
        const rect = slider.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const percentage = x / rect.width;
        
        if (type === 'hue') {
            this.hsb.h = percentage * 360;
            this.updateCanvas();
        } else {
            this.opacity = percentage * 100;
        }
        
        this.updateModalDisplay();
    }
    
    stopDrag() {
        this.isDragging = false;
        this.dragType = null;
    }
    
    updateCanvas() {
        CanvasUtils.drawGradient(this.gradientCanvas, this.hsb.h);
    }
    
    // 메인 화면의 값들을 업데이트 (Select 버튼을 눌렀을 때만 호출됨)
    updateMainDisplay() {
        const hex = ColorUtils.hsbToHex(this.selectedHsb.h, this.selectedHsb.s, this.selectedHsb.b);
        const colorWithOpacity = ColorUtils.hexToRgba(hex, this.selectedOpacity);
        
        // Update main preview
        this.colorPreview.style.backgroundColor = colorWithOpacity;
        this.selectedHex.value = hex;
        this.selectedOpacityInput.value = Math.round(this.selectedOpacity);
    }
    
    // 모달 내부의 값들을 업데이트 (실시간으로 호출됨)
    updateModalDisplay() {
        const hex = ColorUtils.hsbToHex(this.hsb.h, this.hsb.s, this.hsb.b);
        const colorWithOpacity = ColorUtils.hexToRgba(hex, this.opacity);
        
        // Update color selector position
        this.colorSelector.style.left = `${this.hsb.s}%`;
        this.colorSelector.style.top = `${100 - this.hsb.b}%`;
        this.colorSelector.style.backgroundColor = hex;
        
        // Update hue handle
        this.hueHandle.style.left = `${(this.hsb.h / 360) * 100}%`;
        this.hueHandle.style.backgroundColor = `hsl(${this.hsb.h}, 100%, 50%)`;
        
        // Update opacity slider
        this.opacitySlider.style.setProperty('--current-color', hex);
        this.opacityHandle.style.left = `${this.opacity}%`;
        
        // Update custom color display
        this.customColorPreview.style.backgroundColor = colorWithOpacity;
        this.hexInput.value = hex;
        this.opacitySpinner.value = Math.round(this.opacity);
    }
    
    handleHexInput() {
        let value = this.hexInput.value.trim();
        if (!value.startsWith('#')) {
            value = '#' + value;
        }
        
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            const hsb = ColorUtils.hexToHsb(value);
            this.hsb = hsb;
            this.updateCanvas();
            this.updateModalDisplay();
        } else {
            // Revert to current value
            this.hexInput.value = ColorUtils.hsbToHex(this.hsb.h, this.hsb.s, this.hsb.b);
        }
    }
    
    handleOpacitySpinner() {
        const value = parseInt(this.opacitySpinner.value);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            this.opacity = value;
            this.updateModalDisplay();
        } else {
            this.opacitySpinner.value = Math.round(this.opacity);
        }
    }
    
    handleEyedropper() {
        if ('EyeDropper' in window) {
            const eyeDropper = new EyeDropper();
            eyeDropper.open().then((result) => {
                // Hex 값을 HSB로 변환하여 설정
                const hsb = ColorUtils.hexToHsb(result.sRGBHex);
                this.hsb = hsb;
                
                console.log('Eyedropper selected color:', result.sRGBHex);
                console.log('Converted to HSB:', hsb);
                
                // Canvas와 모든 UI 요소를 업데이트
                this.updateCanvas();
                this.updateModalDisplay();
            }).catch((error) => {
                console.log('User cancelled the eyedropper');
            });
        } else {
            alert('EyeDropper API is not supported in this browser');
            console.log('EyeDropper API not supported');
        }
    }
    
    initializeThemeColors() {
        this.themeColors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'theme-color';
            colorDiv.style.backgroundColor = color;
            colorDiv.addEventListener('click', () => {
                const hsb = ColorUtils.hexToHsb(color);
                this.hsb = hsb;
                this.updateCanvas();
                this.updateModalDisplay();
            });
            this.themeColorsGrid.appendChild(colorDiv);
        });
    }
    
    selectColor() {
        // Select 버튼을 눌렀을 때만 선택된 값들을 업데이트
        this.selectedHsb = { ...this.hsb };
        this.selectedOpacity = this.opacity;
        
        const hex = ColorUtils.hsbToHex(this.selectedHsb.h, this.selectedHsb.s, this.selectedHsb.b);
        const colorResult = {
            hex: hex,
            opacity: Math.round(this.selectedOpacity)
        };
        
        console.log('Selected color:', colorResult);
        
        // 메인 화면 업데이트
        this.updateMainDisplay();
        this.closeModal();
    }
}

// Initialize the color picker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ColorPicker();
});
