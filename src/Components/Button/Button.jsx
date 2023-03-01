import React from 'react';
import styled from 'styled-components';
import '../../styles/variables.css'

const ButtonComponent = styled.button
  `
  position: relative;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 0.3rem;
  color: var(--snow);
  font-weight: bold;
  margin: 3px;
  width: 100%;
  padding: 
  ${(props) =>
    props.size
      ? "1.1rem"
      : props.size === "md"
        ? "1.4rem"
        : props.size === "1g"
          ? "1.6rem"
          : "1.1rem"};
  border: 1px solid transparent;
  background-color: ${props => props.variant === "danger" ? "var(--apple)" : props.variant === "dark" ? "#000" : props.variant === "primary" ? "#000" : "#ccc" };
`
const Button = ({ type, variant, className, onClick, children }) => {
  return (
    <ButtonComponent
      type={type}
      variant={variant}
      className={className ? `btn-component ${className}` : 'btn-component'}
      onClick={onClick}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
