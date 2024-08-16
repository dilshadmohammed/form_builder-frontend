import { ChangeEvent } from "react";

type choiceType = {
    id: string,
    text: string
}

type DropdownType = {
    id: string,
    label: string,
    is_required: boolean,
    value: string[], // Array of selected choice texts
    choices: choiceType[], // Array of choices with id and text
    onChange: (fieldId: string, value: string[]) => void; // Callback to handle selected values
}

function Dropdown({ id, label, is_required, onChange, value, choices }: DropdownType) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        onChange(id, selectedOptions);
    }

    return (
        <div>
            <label className="block mb-2 text-md font-medium text-gray-900">
                {label}
            </label>
            <select
                id={id}
                required={is_required}
                onChange={handleChange}
                value={value}
                className="bg-gray-100 text-gray-900 border border-gray-300 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-slate-600 transition ease-in-out duration-150"
            >
                <option value="" disabled>Select an option</option>
                {choices && choices.map((choiceOption) => (
                    <option key={choiceOption.id} value={choiceOption.text}>
                        {choiceOption.text}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;
