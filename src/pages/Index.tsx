
import ColorPicker from '../components/ColorPicker';

const Index = () => {
  const handleColorChange = (color: string) => {
    console.log('Selected color:', color);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Beautiful Color Picker
          </h1>
          <p className="text-xl text-gray-600">
            Choose your perfect color from our curated palette
          </p>
        </div>
        
        <div className="flex justify-center">
          <ColorPicker 
            onColorChange={handleColorChange}
            defaultColor="#8B5CF6"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
