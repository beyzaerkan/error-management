import React from 'react';
import { Box, TextField } from '@mui/material';

function Input({
  id,
  name,
  placeholder,
  type,
  value,
  onChange,
  onFocus,
  error,
  helperText,
  ...props }) {

  return (
    <Box sx={{
      width: '100%',
      margin: '2px',
    }}>
      <TextField
        sx={{
          bgcolor: '#fff',
        }}
        fullWidth
        variant="outlined"
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        error={error}
        onFocus={onFocus}
        helperText={helperText}
      />
    </Box>
  );
}

export default Input;
