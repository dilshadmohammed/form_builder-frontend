import React from 'react'
import ShortAnswer from './ShortAnswer';
import LongAnswer from './LongAnswer';
import UpiPay from './UpiPay';
import MultipleChoice from './MultipleChoice';
import Dropdown from './Dropdown';
import DateField from './DateField';
import RadiButtonField from './RadioButtonField';
import Checkbox from './Checkbox';
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
    onChange:(fieldId: string, value: any) => void;
}
function FieldSelector({id,label,type,is_required,value,onChange,choices,upi_id,amount}:fieldType) {

    const commonProps = { id, label, is_required, value, onChange };

    if (type==='short_answer'){
        return <ShortAnswer {...commonProps}  />
    }
    else if (type==='dropdown'){
      return <Dropdown {...commonProps} choices={choices} />
    }
    else if (type==='upi_payment'){
      return <UpiPay label={label} upi_id={upi_id} amount={amount}/>
    }
    else if(type=='radio_button'){
      return <RadiButtonField {...commonProps} choices={choices} />
    }
    
}

export default FieldSelector