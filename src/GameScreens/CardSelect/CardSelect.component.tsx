import React from "react";
import {
  CardSelectContainer,
  CardSelectGrid,
  CardSelectHeader,
  CardSelectImg,
} from "./CardSelect.styles";
import ImageLoader from "../../Common/AssetsLoader/imageLoader.component";
import { useCards } from "./CardSelect.context";
import { usePlayerHand } from "../../playerHand/playerHand.context";

import { useGrab } from "../../Player/player.context";
import { useWebSocket } from "../../Services/websocket.services";
import { useCurrentPlayer } from "../Room/Room.context";

const CardSelect: React.FC = () => {
  const { cards, setCards, display, setDisplay } = useCards();
  const { images, setImages } = usePlayerHand();
  const { grabbedCard, setgrabbedCard } = useGrab();
  const { sendMessage } = useWebSocket();
  const { RoomId, currentPlayer } = useCurrentPlayer();

  const removeCardFromDeck = (imageName: string, cards: string[]): string[] => {
    return cards.filter((card) => card !== imageName);
  };

  return (
    <CardSelectContainer displayProp={display}>
      <CardSelectHeader>Arrange and pick a card</CardSelectHeader>
      <CardSelectGrid>
        {cards.map((imageName, index) => (
          <div
            key={index}
            draggable
            onClick={() => {
              if (imageName === "" && !imageName) {
                return;
              }
              if (imageName !== "back") {
                setImages([...images, imageName]);
                sendMessage({
                  action: "PowerCardAction",
                  Message: {
                    command: "Alter2",
                    roomId: RoomId,
                    currentPlayer: currentPlayer,
                    playerMove: removeCardFromDeck(imageName, cards),
                  },
                });
              } else {
                setImages([...images, grabbedCard]);
                setgrabbedCard("");
              }
              setDisplay(false);
            }}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", index.toString());
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              const draggedIndex = parseInt(
                e.dataTransfer.getData("text/plain")
              );
              const newCards = [...cards];
              const temp = newCards[draggedIndex];
              newCards[draggedIndex] = newCards[index];
              newCards[index] = temp;
              setCards(newCards);
            }}
          >
            <ImageLoader
              src={import.meta.env.VITE_CARDS_URL + imageName + ".png"}
              StyledImg={CardSelectImg}
            />
          </div>
        ))}
      </CardSelectGrid>
    </CardSelectContainer>
  );
};

export default CardSelect;
