import { ChangeEvent } from "react";

type ChoiceType = {
    id: string,
    text: string
}

type RadioButtonFieldType = {
    id: string,
    label: string,
    is_required: boolean,
    value: string, // Single selected choice text
    choices: ChoiceType[], // Array of choices with id and text
    onChange: (fieldId: string, value: string) => void; // Updated to handle single string value
}

function RadioButtonField({ id, label, is_required, onChange, value, choices }: RadioButtonFieldType) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value: choiceValue } = e.target;
        onChange(id, choiceValue);
    }

    return (
        <div>
            <label className="block mb-2 text-md font-medium text-gray-900">
                {label}
            </label>
            <div className="ml-10">
                {choices && choices.map((choiceOption) => (
                    <label key={choiceOption.id} className="flex items-center mb-2">
                        <input
                            required={is_required}
                            onChange={handleChange}
                            value={choiceOption.id} // Use text as the value for the radio button
                            checked={value === choiceOption.id} // Check if the text is the selected value
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg mr-2"
                            type="radio"
                            name={id} // Use the same name for all radio buttons in the group
                        />
                        <span>{choiceOption.text}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default RadioButtonField;
