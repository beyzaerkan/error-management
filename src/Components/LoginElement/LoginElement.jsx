import React from 'react';
import Input from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import DatePicker from '../DatePicker/DatePicker';
import { Grid } from '@mui/material';

const components = {
  textInput: Input,
  dropdown: Dropdown,
  datePicker: DatePicker,
};

function LoginElement({ whichComponent, label, ...props }) {
  const SpecificElement = components[whichComponent];
  return (
    <Grid container sx={{
      alignItems: 'center'
    }}>
      <Grid item xs={5}>
        {label}
      </Grid>
      <Grid item xs={7}>
        <SpecificElement {...props} />
      </Grid>
    </Grid>
  );
}

export default LoginElement;
