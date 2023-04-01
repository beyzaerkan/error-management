import React from 'react';
import styled from '@emotion/styled';
import  MUIBUtton  from '@mui/material/Button';
import '../../styles/variables.css';

const ButtonComponent = styled(MUIBUtton)
  `
  color: ${props => (props.variant === "light" ||  props.variant === undefined) ? "#000" : "var(--snow)"};
  font-weight: bold;
  margin: 3px;
  width: 
  ${(props) =>
    props.size === "small"
      ? "50%"
      : "100%"
  };
  background-color: ${props => props.variant === "danger" ? "var(--apple)" : props.variant === "dark" ? "#000" : props.variant === "light" ? "#fff" : "transparent"};
  border: ${props => props.variant === "light" ? "1px solid transparent " : "1px solid var(--smoke)"};
`
const Button = ({ disabled=false, type, size, variant, className, onClick, children }) => {
  return (
    <ButtonComponent
      type={type}
      size={size}
      variant={variant}
      className={className ? `btn-component ${className}` : 'btn-component'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
