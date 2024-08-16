import { ChangeEvent } from "react";

type shortAnswerType = {
    id:string,
    label:string,
    is_required:boolean,
    value:string,
    onChange:(fieldId: string, value: any) => void;
}

function ShortAnswer({id,label,is_required,onChange,value}:shortAnswerType) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(id,e.target.value);
    }
    return (
        <div>
            <label className="block mb-2 text-md font-medium text-gray-900">
                {label}
            </label>
            <input required={is_required} onChange={handleChange} value={value} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text"/>
        </div>
  )
}

export default ShortAnswer