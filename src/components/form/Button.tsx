import styled from "styled-components"

const Button = styled.button`
  margin-bottom: 1rem;
  color: white;
  background: black;
  cursor: pointer;
  padding: 0.25rem 1rem;
  box-shadow: 0px 0px;
  transition: box-shadow 150ms linear;
  border: none;
  &:hover,
  &:active {
    box-shadow: 0 0 3px black;
  }
`

export default Button