import styled from "@emotion/styled";
import "./player.styles.css";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

export const PlayerImage = styled.img`
  width: 5vw;
  height: 18vh;
  max-width: 70px;
  max-height: 70px;
  border-radius: 50%;
`;

export const PlayerName = styled.div<{ isPlaying: boolean; group: string }>`
  margin-top: 5px;
  font-size: 0.9em;
  font-weight: bold;
  font-family: sans-serif;
  color: ${(props) =>
    props.group === "1"
      ? "#ff0000"
      : props.group === "2"
      ? "#0000ff"
      : "#05851a"};
  animation: ${(props) => (props.isPlaying ? "pulse 1s infinite" : "none")};

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;
