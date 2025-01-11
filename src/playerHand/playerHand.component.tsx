import React, { useState, useRef, useEffect } from "react";
import {
  PlayerCardImg,
  PlayerScrollButtonLeft,
  PlayerScrollButtonRight,
} from "./playerHand.styles";
import ImageLoader from "../Common/AssetsLoader/imageLoader.component";
import { useSelection } from "../GameBoard/gameboard.context";
import { usePlayedCard } from "../PlayedCard/PlayedCard.context";
import { usePlayerHand } from "./playerHand.context";
import { useCards } from "../GameScreens/CardSelect/CardSelect.context";
import { useGrab } from "../Player/player.context";

import { useSuggestion } from "../GameScreens/Suggestion/Suggestion.context";
import { useTurn } from "../playArea/deck.context";
import { useWebSocket } from "../Services/websocket.services";
import { useCurrentPlayer } from "../GameScreens/Room/Room.context";

const ImageGallery: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setIsSelectionActive, setCardValue } = useSelection();
  const { setPlayedCard } = usePlayedCard();
  const { images, setImages } = usePlayerHand();
  const {
    setCards,
    setDisplay,
    dropCard,
    setdropCard,
    DropCardNum,
    setDropCardNum,
  } = useCards();
  const { setGrab, setplayerName, setgrabbedCard } = useGrab();
  const { setSuggestion, setSuggestionType } = useSuggestion();
  const { isYourTurn, setIsTurnCompleted, setIsYourTurn } = useTurn();
  const { RoomId, currentPlayer } = useCurrentPlayer();
  const { messages, sendMessage } = useWebSocket();

  useEffect(() => {
    // Handle turn completion based on player's hand
    if (messages[0]?.content?.currentPlayer === currentPlayer) {
      setIsTurnCompleted(images.length === 0);
    }

    // Update player's hand when receiving cards
    if (messages[0]?.content?.cards) {
      // setImages(messages[0]?.content?.cards);
      setImages(["SKIP","ALTER","REVERSE","DROP","DROP","DESTROY", "ERASE", "ERASE", "ERASE","GRAB", "JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER","JOKER"])
    }

    // Handle power card actions
    if (messages[0]?.type === "Power") {
      const content = messages[0]?.content;
      const command = content?.command;

      switch (command) {
        case "Deck":
          if (content?.card) {
            setImages([...images, content.card]);
          }
          break;

        case "Alter1":
          if (content?.cards) {
            setCards(content.cards);
            setDisplay(true);
          }
          break;

        case "Grab":
          if (content?.card && content.card != "") {
            setgrabbedCard(content.card);
            setDisplay(true);
          }
          break;

        case "GrabFrom":
          const returnPlayerid = content?.returnPlayerid;
          if (images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            const grabbedCard = images[randomIndex];
            setImages(images.filter((_, i) => i !== randomIndex));

            sendMessage({
              action: "PowerCardAction",
              Message: {
                command: "GrabFrom",
                roomId: RoomId,
                currentPlayer: currentPlayer,
                grabPlayer: returnPlayerid,
                playerMove: grabbedCard,
              },
            });
          } else {
            sendMessage({
              action: "PowerCardAction",
              Message: {
                command: "GrabFrom",
                roomId: RoomId,
                currentPlayer: currentPlayer,
                grabPlayer: returnPlayerid,
                playerMove: "",
              },
            });
          }
          break;
      }
    }

    // Handle drop card power updates
    if (
      messages[0]?.type === "PowerUpdate" &&
      messages[0]?.content?.command === "Drop" &&
      messages[0]?.content?.playerMove &&
      messages[0]?.content?.currentPlayer === currentPlayer
    ) {
      setdropCard(true);
      setSuggestionType("info");
      setSuggestion(
        "Drop a card or use your Drop card to increase the drop count for next player"
      );
      setDropCardNum(messages[0].content.playerMove);
    }
  }, [messages]);

  // Reset scroll position when images change
  useEffect(() => {
    setScrollPosition(0);
  }, [images]);

  // Check if buttons should be shown
  useEffect(() => {
    if (containerRef.current) {
      setShowButtons(
        containerRef.current.scrollWidth > containerRef.current.clientWidth
      );
    }
  }, [images]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 200;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setScrollPosition(newPosition);
    }
  };

  const allcardvalues = [
    "R0",
    "R1",
    "R2",
    "R3",
    "R4",
    "R5",
    "R6",
    "R7",
    "R8",
    "R9",
    "B0",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "G0",
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "G6",
    "G7",
    "G8",
    "G9",
  ];

  const HandleCard = (image: string, index: number) => {
    if (!isYourTurn) {
      return;
    }
    setIsTurnCompleted(true);
    setIsYourTurn(false);
    setImages(images.filter((_, i) => i !== index));
    setPlayedCard(image);
    if (dropCard) {
      if (image === "DROP") {
        sendMessage({
          action: "PowerCardAction",
          Message: {
            command: "Drop",
            roomId: RoomId,
            currentPlayer: currentPlayer,
            playerMove: DropCardNum + 1,
          },
        });
        setDropCardNum(0);
        setdropCard(false);
        setIsTurnCompleted(false);
      } else {
        const dropcount = DropCardNum - 1;
        setDropCardNum(dropcount);

        if (dropcount === 0) {
          sendMessage({
            action: "PowerCardAction",
            Message: {
              command: "Drop1",
              roomId: RoomId,
              currentPlayer: currentPlayer,
              lastPlayedCard: image,
            },
          });
          setIsTurnCompleted(false);
        }
        setIsYourTurn(dropcount !== 0);
        setdropCard(dropcount !== 0);
      }
    } else {
      if (allcardvalues.includes(image)) {
        setSuggestion("Place a coin on the board");
        setIsSelectionActive("Place");
        setCardValue(image);
      } else {
        //power
        switch (image) {
          case "ALTER":
            sendMessage({
              action: "PowerCardAction",
              Message: {
                command: "Alter1",
                roomId: RoomId,
                currentPlayer: currentPlayer,
              },
            });
            setIsTurnCompleted(false);
            break;
          case "DROP":
            sendMessage({
              action: "PowerCardAction",
              Message: {
                command: "Drop",
                roomId: RoomId,
                currentPlayer: currentPlayer,
                playerMove: 1,
              },
            });
            setIsTurnCompleted(false);
            break;
          case "GRAB":
            setSuggestion("Select a player to grab a card");

            setGrab(true);
            setIsTurnCompleted(false);
            setCards(["back", "back", "back", "back"]);
            setplayerName("");
            break;
          case "SKIP":
            setIsTurnCompleted(false);
            sendMessage({
              action: "PowerCardAction",
              Message: {
                command: "Skip",
                roomId: RoomId,
                currentPlayer: currentPlayer,
              },
            });
            break;
          case "REVERSE":
            setIsTurnCompleted(false);
            sendMessage({
              action: "PowerCardAction",
              Message: {
                command: "Reverse",
                roomId: RoomId,
                currentPlayer: currentPlayer,
              },
            });
            break;
          case "ERASE":
            setIsTurnCompleted(false);
            setSuggestion(
              "Remove a coin from the board that is not in a claimed sequence"
            );

            setIsSelectionActive("Erase");
            break;
          case "JOKER":
            setSuggestion("Place a coin in any non-filled cell");

            setIsSelectionActive("Joker");
            break;
          case "DESTROY":
            setSuggestion("Select the Sequence to destroy");

            setIsSelectionActive("Destroy");
            break;
        }
      }
    }
  };
  return (
    <div style={{ position: "relative", marginTop: "65vh" }}>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          overflowX: "hidden",
          overflowY: "hidden",
          scrollBehavior: "smooth",
        }}
      >
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            onClick={() => HandleCard(image, index)}
          >
            {image !== "" && <ImageLoader
              src={import.meta.env.VITE_CARDS_URL + image + ".png"}
              StyledImg={PlayerCardImg}
            />}
            
          </div>
        ))}
      </div>

      {showButtons && (
        <>
          <PlayerScrollButtonLeft
            scrollPosition={scrollPosition}
            hidden={false}
            onClick={() => scroll("left")}
          >
            {"<"}
          </PlayerScrollButtonLeft>
          <PlayerScrollButtonRight
            hidden={false}
            onClick={() => scroll("right")}
          >
            {">"}
          </PlayerScrollButtonRight>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
