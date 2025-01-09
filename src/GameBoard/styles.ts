import styled from '@emotion/styled';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1%;
  width: fit-content;
  background-color: #e0e0e0;
  padding: 2px;
  border-radius: 4px;

`;

export const Cell = styled.div<{ backgroundColor: string; isClicked?: boolean }>`
  width: 3vw;
  max-width:40px;
  height: 5vh;
   max-height:40px;
  background-color: ${props => props.backgroundColor};
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid ${props => props.isClicked ? 'rgb(162, 0, 255)' : 'transparent'};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 2px 4px rgb(255, 255, 255);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const CellNumber = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
`;

export const IconImage = styled.img`
  width: 2.5vw;
  height: 4vh;
  max-width: 30px;
  max-height: 30px;
  object-fit: contain;
`;



export const PlayerScrollButtonLeft = styled.button<{scrollPosition:number}>`
position: absolute;
left: 0;
top: 50%;
transform: translateY(-50%);
display: ${props => props.scrollPosition === 0 ? 'none' : 'block'};
background-color: #4a90e2;
color: white;
border: none;
border-radius: 50%;
width: 40px;
height: 40px;
cursor: pointer;
font-size: 20px;
box-shadow: 0 2px 4px rgba(0,0,0,0.2);
transition: all 0.2s ease-in-out;

&:hover {
  background-color: #357abd;
  transform: translateY(-50%) scale(1.1);
}`;

export const PlayerScrollButtonRight = styled.button`
 position: absolute;
right: 0;
top: 50%;
transform: translateY(-50%);
background-color: #4a90e2;
hidden: ${props => props.hidden === false? 'none' : 'block'};
color: white;
border: none;
border-radius: 50%;
width: 40px;
height: 40px;
cursor: pointer;
font-size: 20px;
box-shadow: 0 2px 4px rgba(0,0,0,0.2);
transition: all 0.2s ease-in-out;

&:hover {
  background-color: #357abd;
  transform: translateY(-50%) scale(1.1);
}`;

export const PlayerCardImg = styled.img`
 width: 100px;
  height: 150px;
  object-fit: cover;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    
    transform: scale(2) translateY(-20px);
    z-index: 1;
  }  }
`;

