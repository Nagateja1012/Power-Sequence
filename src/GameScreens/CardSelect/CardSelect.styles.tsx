import styled from '@emotion/styled';

export const CardSelectContainer = styled.div<{display:boolean}>`
  background-color: rgba(255, 255, 255, 0.9);
  display: ${(props) => props.display ? 'block' : 'none'};
 

  gap: 20px;
  border-radius: 8px;
  z-index: 2;
  position: absolute;
  top: 20%;
`
export const CardSelectGrid = styled.div`
display: grid;
 padding: 5%;
  grid-template-columns: repeat(4, 1fr);
`
export const CardSelectImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  cursor: move;
`
export const CardSelectHeader = styled.div`
  text-align: center;
  padding-top: 5px;
  color: red;
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`
