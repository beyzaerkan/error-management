import React from 'react';
import TextInput from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import DatePicker from '../DatePicker/DatePicker';
import './LoginElement.css'

const components = {
  textInput: TextInput,
  dropdown: Dropdown,
  datePicker: DatePicker,
};

function LoginElement({ whichComponent, label, ...props }) {
  const SpecificElement = components[whichComponent];
  return (
    <div className='login-element'>
      <div className='label'>{label}</div>
      <div className='specific-element'>
            <SpecificElement {...props}/>
      </div>
    </div>
  );
}

export default LoginElement;
