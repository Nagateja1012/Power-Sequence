import { useState } from "react";
import { ButtonContainer, CloseButton, ModalContent, ModalOverlay, StyledButton } from "./Rules.styles";

const RulesOverlay = ({ onClose }: { onClose: () => void }) => (
    <ModalOverlay>
      <ModalContent>
        <CloseButton 
          onClick={onClose}
        >
          ×
        </CloseButton>
        <h2 style={{ color: '#2c3e50', fontSize: '28px', marginBottom: '20px', textAlign: 'center' }}>Game Rules</h2>
        
        <div style={{maxHeight: '80vh', overflowY: 'auto', padding: '0 20px'}}>
          <h3 style={{ color: '#34495e', fontSize: '22px', marginTop: '25px', marginBottom: '15px' }}>How to Play</h3>
          <ul style={{ lineHeight: '1.6', color: '#555' }}>
            <li>Create a room, select teams, and share the 6-digit room ID and password</li>
            <li>Shuffle and deal 4 cards to each player</li>
            <li>Players take turns placing cards and coins according to the card's color and number</li>
            <li>The goal is to form two sequences. The first to do so wins!</li>
            <li>Power cards allow you to take special actions, including skipping turns, reversing order, and destroying sequences</li>
            <li>If you can't play, draw a card before your next turn</li>
          </ul>

          <h3 style={{ color: '#34495e', fontSize: '22px', marginTop: '25px', marginBottom: '15px' }}>Power Cards</h3>
          <ul style={{ lineHeight: '1.6', color: '#555' }}>
            <li><strong style={{ color: '#2c3e50' }}>Skip:</strong> Skip the next player's turn</li>
            <li><strong style={{ color: '#2c3e50' }}>Reverse:</strong> Reverse the order of play</li>
            <li><strong style={{ color: '#2c3e50' }}>Erase:</strong> Remove one coin from the board (except from a completed sequence)</li>
            <li><strong style={{ color: '#2c3e50' }}>Alter Future:</strong> View and change the top 4 cards, then pick one</li>
            <li><strong style={{ color: '#2c3e50' }}>Grab:</strong> Steal a card from a chosen player</li>
            <li><strong style={{ color: '#2c3e50' }}>Destroy:</strong> Remove a completed sequence (3 cards)</li>
            <li><strong style={{ color: '#2c3e50' }}>Joker:</strong> Place a coin on any card</li>
            <li><strong style={{ color: '#2c3e50' }}>Drop Card:</strong> Force the next player to drop a card</li>
          </ul>

          <h3 style={{ color: '#34495e', fontSize: '22px', marginTop: '25px', marginBottom: '15px' }}>Game Rules</h3>
          <ul style={{ lineHeight: '1.6', color: '#555' }}>
            <li>Four corners are wild and can form a sequence of 4 coins</li>
            <li>Sequences can be formed with 5 coins in any direction (excluding corners)</li>
            <li>Only one Drop Card can be played at a time</li>
            <li>Drop a Drop Card on another to make the next player drop more cards</li>
            <li>Dead cards must be dropped one at a time; your turn ends</li>
            <li>Power cards end your turn once played</li>
            <li>Teams take turns alternately</li>
          </ul>

          <h3 style={{ color: '#34495e', fontSize: '22px', marginTop: '25px', marginBottom: '15px' }}>Sequence Rules</h3>
          <ul style={{ lineHeight: '1.6', color: '#555', marginBottom: '20px' }}>
            <li>Claim sequences when completed:
              <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
                <li>If forgotten, the next enemy can destroy it (using Erase)</li>
                <li>Your teammate can claim it next</li>
              </ul>
            </li>
            <li>After two sequences are made, they must be claimed to end the game</li>
            <li>No more than 2 coins from old sequences can be used to form a new one</li>
          </ul>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
  
  export const HelpButtons = () => {
    const [showRules, setShowRules] = useState(false);
  
    return (
      <ButtonContainer>
        <StyledButton 
          onClick={() => window.open(import.meta.env.VITE_YOUTUBE_URL, '_blank')}
        >
          Watch How to Play
        </StyledButton>
        <StyledButton 
          onClick={() => setShowRules(true)}
        >
          Rules & How to Play
        </StyledButton>
        {showRules && <RulesOverlay onClose={() => setShowRules(false)} />}
      </ButtonContainer>
    );
  };
