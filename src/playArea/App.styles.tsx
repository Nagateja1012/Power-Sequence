import styled from "@emotion/styled";

export const PlayArea = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.81);
  padding: 2rem;
  border-radius: 10px;
  width: 70%;
  max-width: 1200px;
  min-height: 700px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const GameBoardStyle = styled.div`
  position: absolute;
  top: 45%;
  left: 47%;
  transform: translate(-50%, -50%);
`;

export const Deck = styled.div`
  position: absolute;
  left: 18%;
  top: 40%;
  transform: translateY(-50%);
`;

export const PlayedCards = styled.div`
  position: absolute;
  right: 18%;
  top: 40%;
  transform: translateY(-50%);
`;

export const ClaimButton = styled.button`
  position: absolute;
  width: 5vw;
  height: 5.2vh;
  max-width: 100px;
  max-height: 50px;
  background-color: #d4edda;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  right: 20%;
  top: 60%;
  cursor: pointer;
`;

export const Score = styled.button`
  position: absolute;
  width: 5vw;
  height: 5.2vh;
  max-width: 100px;
  max-height: 50px;
  background-color: #fff3cd;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  left: 19%;
  top: 60%;
  cursor: pointer;
`;

export const DeckImage = styled.img`
  width: 7vw;
  height: 18vh;
  max-width: 120px;
  max-height: 180px;
  cursor: pointer;
`;
