import React from 'react';
import styled from 'styled-components';
import '../../styles/variables.css';

const ButtonComponent = styled.button
  `
  position: relative;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 0.3rem;
  color: ${props => (props.variant === "light" ||  props.variant === undefined) ? "#000" : "var(--snow)"};
  font-weight: bold;
  margin: 3px;
  width: 
  ${(props) =>
    props.size === "slim"
      ? "50%"
      : "100%"
  };
  background-color: ${props => props.variant === "danger" ? "var(--apple)" : props.variant === "dark" ? "#000" : props.variant === "light" ? "#fff" : "transparent"};
  padding: 
  ${(props) =>
    props.size === "slim"
      ? "2px"
      : props.size === "full"
        ? "5px"
        : "15px"};
  border: ${props => props.variant === "light" ? "1px solid transparent " : "1px solid var(--smoke)"};
  &:hover {
    cursor: ${props => props.disabled === false ? "pointer" : "context-menu"};
  }
  &:disabled, [disabled]{
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`
const Button = ({ disabled=false, size, variant, className, onClick, children }) => {
  return (
    <ButtonComponent
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
