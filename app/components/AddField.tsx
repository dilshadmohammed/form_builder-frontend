import  { useState } from 'react';
import './style.css'

function AddField() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    type: '',
    choices: [] as string[],
  });
  const [newChoice, setNewChoice] = useState('');
    const formTypes = [{
        name: 'Short Answer',
        value: 'short_answer'
    },
    {
        name: 'Long Answer',
        value: 'long_answer'
    },
    {
        name: 'Multiple Choice',
        value: 'multiple_choice'
    },
    {
        name: 'UPI Payment',
        value: 'upi_payment'
    }
];

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    console.log('Form data submitted:', formData);
    setFormData({ label: '', type: '', choices: [] }); // Clear form
    setIsOpen(false); // Close popup after submission
  };

  const handleCancel = () => {
    setFormData({ label: '', type: '', choices: [] }); // Clear form
    setIsOpen(false); // Close popup
  };

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChoice(e.target.value);
  };

  const handleAddChoice = () => {
    if (newChoice.trim() && !formData.choices.includes(newChoice.trim())) {
      setFormData({
        ...formData,
        choices: [...formData.choices, newChoice.trim()],
      });
      setNewChoice(''); // Clear the input after adding
    }
  };

  const handleRemoveChoice = (index: number) => {
    setFormData({
      ...formData,
      choices: formData.choices.filter((_, i) => i !== index),
    });
  };


  return (
    <div className="relative">
      {/* Trigger button to open popup */}
      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Open Form
      </button>

      {/* Popup Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-96 mx-auto px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">
              Add New Field
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-800 mb-1" htmlFor="label">
                  Label
                </label>
                <input
                  type="text"
                  id="label"
                  name="label"
                  value={formData.label}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
                  placeholder="Enter label"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-800 mb-1" htmlFor="type">
                  Type
                </label>
                <select
                  value={formData.type}
                  name="type"
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ease-in-out duration-150"
                >
                  {formTypes.map((formType, index) => (
                    <option
                      key={index}
                      value={formType.value}
                      className="bg-white text-gray-900"
                    >
                      {formType.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Choices Section */}
              {(formData.type === 'multiple_choice' || formData.type === 'single_select' || formData.type === 'dropdown') && (
                <div className="mb-4">
                  <label className="block text-gray-800 mb-1" htmlFor="choices">
                    Choices
                  </label>
                  <div className="flex flex-col mb-4">
                    <div className='max-h-52 overflow-scroll scrollbar-hidden mb-2'>

                    {formData.choices.map((choice, index) => (
                        <div
                        key={index}
                        className="flex justify-between items-center bg-gray-200 rounded-lg p-2 mb-2"
                        >
                        <span>{choice}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveChoice(index)}
                          className="text-red-500 hover:text-red-700 transition duration-300"
                          >
                          &times;
                        </button>
                      </div>
                    ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newChoice}
                        onChange={handleChoiceChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                handleAddChoice();
                            }}
                        className="w-full px-4 py-2 bg-inherit border-b border-black focus:outline-none focus:border-b-2 transition duration-300"
                        placeholder="Enter a choice"
                      />
                    </div>
                  </div>
                </div>
              )}
            {/* upi payment fields */}
            {formData.type === 'upi_payment' && (
                <div className='grid grid-cols-2 gap-3'>
                <div className="mb-4">
                <label className="block text-gray-800 mb-1" htmlFor="upi_id">
                  UPI Id
                </label>
                <input
                  type="text"
                  id="label"
                  name="label"
                  value={formData.label}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
                  placeholder="Enter label"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 mb-1" htmlFor="amount">
                  Amount
                </label>
                <input
                  type="text"
                  id="label"
                  name="label"
                  value={formData.label}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
                  placeholder="Enter label"
                />
              </div>
              </div>
                
            )}
              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  type="button"
                  className="bg-white border-2 border-gray-400 text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  Add
                </button>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddField;
