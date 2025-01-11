import styled from "@emotion/styled";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1%;
  width: fit-content;
  background-color: #e0e0e0;
  padding: 2px;
  border-radius: 4px;
`;

export const Cell = styled.div<{
  backgroundColor: string;
  isClicked?: boolean;
}>`
  width: 3vw;
  max-width: 40px;
  height: 5vh;
  max-height: 40px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid
    ${(props) => (props.isClicked ? "rgb(162, 0, 255)" : "transparent")};
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
