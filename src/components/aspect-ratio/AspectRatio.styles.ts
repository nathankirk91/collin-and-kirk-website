import styled from "styled-components"
interface OuterWrapperProps {
    ratio: number
}
export const OuterWrapper = styled.div<OuterWrapperProps>`
  position: relative;
  width: 100%;
  height: 0;
  /**
   * For human readability, the ratio is expressed as
   * width / height, so we need to invert it.
   */
  padding-bottom: ${props => (1 / props.ratio) * 100}%;
`
export const InnerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`