import { ChangeEvent } from "react";

type CheckboxType = {
    id: string,
    label: string,
    is_required: boolean,
    value: boolean, // Changed to boolean to handle true/false values
    onChange: (fieldId: string, value: boolean) => void; // Updated to handle boolean value
}

function Checkbox({ id, label, is_required, onChange, value }: CheckboxType) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(id, e.target.checked); // Pass boolean value based on checkbox state
    }

    return (
        <div className="flex items-center mb-2">
            <input
                id={id}
                required={is_required}
                onChange={handleChange}
                checked={value} // Set checked based on boolean value
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg mr-2"
                type="checkbox"
            />
            <label htmlFor={id} className="text-md font-medium text-gray-900">
                {label}
            </label>
        </div>
    )
}

export default Checkbox;
