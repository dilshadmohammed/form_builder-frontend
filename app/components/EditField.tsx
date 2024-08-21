import { useState } from 'react';
import MenuButton from './MenuButton';

const EditField: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ label: '', type: '' });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    // Handle the form submission logic here
    console.log('Form data submitted:', formData);
    setFormData({ label: '', type: '' }); // Clear form
    setIsOpen(false); // Close popup after submission
  };

  const handleCancel = () => {
    setFormData({ label: '', type: '' }); // Clear form
    setIsOpen(false); // Close popup
  };

  return (
    <div className="relative">
      {/* Trigger button to open popup */}
      <MenuButton onClick={togglePopup} />
      {/* Popup Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Field</h2>

            {/* Label Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="label">
                Label
              </label>
              <input
                type="text"
                id="label"
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Type Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditField;
