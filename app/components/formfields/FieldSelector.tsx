import React from 'react'
import ShortAnswer from './ShortAnswer';
import LongAnswer from './LongAnswer';
import UpiPay from './UpiPay';
import MultipleChoice from './MultipleChoice';
import Dropdown from './Dropdown';
import DateField from './DateField';
import RadiButtonField from './RadioButtonField';
import Checkbox from './Checkbox';
import FileUpload from './FileUpload';
type choiceType = {
  id: string,
  text: string
}
type fieldType = {
    id:string,
    label:string,
    type:string,
    is_required:boolean,
    value:any,
    choices:choiceType[],
    upi_id:string,
    amount:string,
    qr_code:string,
    onChange:(fieldId: string, value: any) => void;
}
function FieldSelector({id,label,type,is_required,value,onChange,choices,upi_id,amount,qr_code}:fieldType) {

    const commonProps = { id, label, is_required, value, onChange };

    switch (type) {
      case 'short_answer': return <ShortAnswer {...commonProps} />
      case 'long_answer': return <LongAnswer {...commonProps} />
      case 'radio_button': return <RadiButtonField {...commonProps} choices={choices} />
      case 'upi_payment': return <UpiPay {...commonProps} upi_id={upi_id} amount={amount} qr_code={qr_code} />
      case 'dropdown': return <Dropdown {...commonProps} choices={choices} />
      case 'checkbox': return <Checkbox {...commonProps} />
      case 'date': return <DateField {...commonProps} />
      case 'multiple_choice': return <MultipleChoice {...commonProps} choices={choices} />
      case 'file_upload': return <FileUpload {...commonProps} />
    }
    
}

export default FieldSelector