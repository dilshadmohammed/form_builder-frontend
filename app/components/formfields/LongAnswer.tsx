import { ChangeEvent } from "react";

type longAnswerType = {
    id:string,
    label:string,
    is_required:boolean,
    value:string,
    onChange:(fieldId: string, value: any) => void;
}

function LongAnswer({id,label,is_required,onChange,value}:longAnswerType) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(id,e.target.value);
    }
    return (
        <div>
            <label className="block mb-2 text-md font-medium text-gray-900">
                {label}
            </label>
            <textarea required={is_required} onChange={handleChange} value={value} className="bg-gray-50 border border-gray-300 h-28 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"/>
        </div>
  )
}

export default LongAnswer