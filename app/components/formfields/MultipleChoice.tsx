import { ChangeEvent } from "react";

type choiceType = {
    id: string,
    text: string
}

type MultipleChoiceType = {
    id: string,
    label: string,
    is_required: boolean,
    value: string[], // Array of selected choice texts
    choices: choiceType[], // Array of choices with id and text
    onChange: (fieldId: string, value: string[]) => void; // Updated to handle array of strings
}

function MultipleChoice({ id, label, is_required, onChange, value, choices }: MultipleChoiceType) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value: choiceValue, checked } = e.target;
        const newValue = checked
            ? [...value, choiceValue]
            : value.filter(v => v !== choiceValue);
        onChange(id, newValue);
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
                        value={choiceOption.id} // Use text as the value for the checkbox
                        checked={value.includes(choiceOption.id)} // Check if the text is included in the value array
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg mr-2"
                        type="checkbox"
                    />
                    <span>{choiceOption.text}</span>
                </label>
            ))}
            </div>
        </div>
    )
}

export default MultipleChoice;
