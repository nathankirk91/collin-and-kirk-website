import React from "react"
import styled from "styled-components"

interface BackdropProps {
  onClick: ()=>void 
}

const Backdrop: React.FC<BackdropProps> = ({onClick}) => {
  const handleOnClick = () => {
    onClick()
  }
  return <Container onClick={handleOnClick}/>
}

export default Backdrop

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
`