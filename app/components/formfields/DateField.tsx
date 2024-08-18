import { ChangeEvent } from "react";

type DateFieldType = {
    id:string,
    label:string,
    is_required:boolean,
    value:string,
    onChange:(fieldId: string, value: any) => void;
}

function DateField({id,label,is_required,onChange,value}:DateFieldType) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(id,e.target.value);
    }
    return (
        <div>
            <label className="block mb-2 text-md font-medium text-gray-900">
                {label}
            </label>
            <input onChange={handleChange} className="bg-gray-100 text-gray-900 border-0 rounded-md p-2" id="age" type="date"/>
        </div>
  )
}

export default DateField