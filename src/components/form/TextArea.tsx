import styled from "styled-components"

const TextArea = styled.textarea.attrs(props => ({
  rows: 10,
}))`
  padding: 10px;
  width: 100%;
  resize: none;
  /* max-width: 330px; */
  border: 1px;
  border-radius: 6px;
`

export default TextArea
