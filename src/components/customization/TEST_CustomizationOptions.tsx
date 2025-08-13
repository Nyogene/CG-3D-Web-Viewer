import { FaPalette, FaImage, FaStar } from 'react-icons/fa';  
  
  
export const TEST_colorOptions = [
    { id: 'red', name: 'Red', icon: <FaPalette className="w-4 h-4" />, color: '#8B2121' },
    { id: 'blue', name: 'Blue', icon: <FaPalette className="w-4 h-4" />, color: '#1E90FF' },
    { id: 'orange', name: 'Orange', icon: <FaPalette className="w-4 h-4" />, color: '#FF8C00' },
    { id: 'green', name: 'Green', icon: <FaPalette className="w-4 h-4" />, color: '#32CD32' },
    { id: 'purple', name: 'Purple', icon: <FaPalette className="w-4 h-4" />, color: '#9370DB' },
    { id: 'black', name: 'Black', icon: <FaPalette className="w-4 h-4" />, color: '#000000' },
    { id: 'white', name: 'White', icon: <FaPalette className="w-4 h-4" />, color: '#FFFFFF' }
];

export const TEST_textureOptions = [
    { id: 'smooth', name: 'Smooth', icon: <FaImage className="w-4 h-4" /> },
    { id: 'rough', name: 'Rough', icon: <FaImage className="w-4 h-4" /> },
    { id: 'metallic', name: 'Metallic', icon: <FaImage className="w-4 h-4" /> }
];

export const TEST_stickerOptions = [
    { id: 'none', name: 'None', icon: <FaStar className="w-4 h-4" /> },
    { id: 'logo', name: 'Logo', icon: <FaStar className="w-4 h-4" /> }
];