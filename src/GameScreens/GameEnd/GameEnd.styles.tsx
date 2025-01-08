import styled from '@emotion/styled';


export const ResultContainer = styled.div<{display:string}>`
  background-color: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: absolute;
   min-width: 30%;
  min-height: 30%;
    width: 70%;
top:10%;
left:10%;
zIndex: 1;
display: ${(props) => props.display };
`;

export const ResultText = styled.h2`
padding: 10px;
  animation: moveUp 3s ease-out forwards;
  position: relative;
  text-align: center;
  color:rgb(241, 145, 36);
  font-size: 2.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);

  @keyframes moveUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const GameEndButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
`;
