
import React, { useState } from 'react';

import {  FormGroup, GameFormContainer, GameFormStyled, Input, Label, ModeToggle, Select, StyledTitle, SubmitButton, ToggleButton } from './lobby.styles';
import { GameFormData } from '../../models/model';



interface GameFormProps {
  onSubmit: (formData: GameFormData) => void;
}



const GameForm: React.FC<GameFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<GameFormData>({
    playerName: '',
    numPlayers: '2',
    numTeams: '2',
    roomId: '',
    roomPassword: '',
    PlayerUseName: '',
    isCreate: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleMode = (isCreate: boolean) => {
    setFormData(prev => ({
      ...prev,
      isCreate,
      roomId: isCreate ? '' : prev.roomId
    }));
  };

  return (
    <GameFormContainer>
     
<StyledTitle>Power Sequence</StyledTitle>    
        <ModeToggle>
        <ToggleButton 
 
          onClick={() => toggleMode(true)}
          active= {formData.isCreate}
        >
          Create Game
        </ToggleButton>
        <ToggleButton 

          onClick={() => toggleMode(false)}
          active= {!formData.isCreate}
        >
          Join Game
        </ToggleButton>
      </ModeToggle>

      <GameFormStyled onSubmit={handleSubmit} >
        <FormGroup>
          <Label htmlFor="playerName">Player Name</Label>
          <Input
            type="text"
            id="playerName"
            name="playerName"
            value={formData.playerName}
            onChange={handleChange}
            required
            
            placeholder="Enter your name"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="PlayerUseName">Player Username</Label>
          <Input
            type="text"
            id="PlayerUseName"
            name="PlayerUseName"
            value={formData.PlayerUseName}
            onChange={handleChange}
            required
            
            placeholder="Enter your Username"
          />
        </FormGroup>

        {formData.isCreate && (
          <>
            <FormGroup >
              <Label htmlFor="numPlayers">Number of Players</Label>
              <Select
                id="numPlayers"
                name="numPlayers"
                value={formData.numPlayers}
                onChange={handleChange}
                required
              >
                {[...Array(11)].map((_, i) => (
                  <option key={i + 2} value={i + 2}>
                    {i + 2}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </>
        )}
        {formData.isCreate && (
          <>
            <FormGroup >
              <Label htmlFor="numTeams">Number of Teams</Label>
              <Select
                id="numTeams"
                name="numTeams"
                value={formData.numTeams}
                onChange={handleChange}
                required
              >
                {[...Array(2)].map((_, i) => (
                  <option key={i + 2} value={i + 2}>
                    {i + 2}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </>
        )}

        {!formData.isCreate && (
          <FormGroup>
            <Label htmlFor="roomId">Room ID</Label>
            <Input
              type="text" 
              id="roomId"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
              placeholder="Enter room ID"
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label htmlFor="roomPassword">Room Password</Label>
          <Input
            type="password"
            id="roomPassword"
            name="roomPassword"
            value={formData.roomPassword}
            onChange={handleChange}
            required
            placeholder="Enter room password"
          />
        </FormGroup>

        <SubmitButton type="submit" >
          {formData.isCreate ? 'Create Game' : 'Join Game'}
        </SubmitButton>
      </GameFormStyled>
    </GameFormContainer>
  );
};

export default GameForm;
