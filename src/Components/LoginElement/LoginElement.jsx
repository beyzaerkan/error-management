import React from 'react';
import Input from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import DatePicker from '../DatePicker/DatePicker';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const components = {
  textInput: Input,
  dropdown: Dropdown,
  datePicker: DatePicker,
};

function LoginElement({ whichComponent, label, ...props }) {
  const SpecificElement = components[whichComponent];
  const {t} = useTranslation();
  return (
    <Grid container sx={{
      alignItems: 'center'
    }}>
      <Grid item xs={5}>
        {t(label)}
      </Grid>
      <Grid item xs={7}>
        <SpecificElement {...props} />
      </Grid>
    </Grid>
  );
}

export default LoginElement;
