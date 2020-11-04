import React from "react"
import styled, { css } from "styled-components"

interface ModalProps {
  handleClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ handleClose, children }) => {
  return (
    <ModalContainer varWidth="md">
      <Close onClick={handleClose}>X</Close>
      {children}
    </ModalContainer>
  )
}

export default Modal

interface ModalContainerProps {
  readonly varWidth: string
}

const ModalContainer = styled.div<ModalContainerProps>`
  position: fixed;
  background-color: white;
  border-radius: 5px;
  top: 30px;
  left: calc((100% - 30rem) / 2);
  width: 30rem;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-height: calc(100vh - 100px);
  overflow: auto;
  ${props =>
    props.theme.mediaQuery[props.varWidth](css`
      width: 90%;
      left: 5%;
    `)}
`
const Close = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  z-index: 30;
`
