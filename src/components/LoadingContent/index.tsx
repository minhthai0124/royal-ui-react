import styled, { keyframes } from 'styled-components'

const movingGradient = keyframes`
  0% { background-position: -250px 0; }
  100% { background-position: 250px 0; }
`;

const LoadingContent: any = styled.div`
  width: 100%;
  display: block;
  height: ${(props: any) => props.height ? `${props.height}px !important` : '20px !important'};
  background: linear-gradient(to right, #eee 30%, #ddd 60%, #eee 80%);
  background-size: 500px 100px;
  animation-name: ${movingGradient};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`

export default LoadingContent
