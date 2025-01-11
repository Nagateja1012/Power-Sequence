import styled from "@emotion/styled";

export const PlayerScrollButtonLeft = styled.button<{ scrollPosition: number }>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: ${(props) => (props.scrollPosition === 0 ? "none" : "block")};
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #357abd;
    transform: translateY(-50%) scale(1.1);
  }
`;

export const PlayerScrollButtonRight = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: #4a90e2;
  hidden: ${(props) => (props.hidden === false ? "none" : "block")};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #357abd;
    transform: translateY(-50%) scale(1.1);
  }
`;

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
