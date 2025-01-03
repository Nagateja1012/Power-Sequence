
import React, { useState } from 'react';

import {  FormGroup, GameFormContainer, GameFormStyled, Input, Label, ModeToggle, Select, SubmitButton, ToggleButton } from './lobby.styles';

interface GameFormProps {
  onSubmit: (formData: GameFormData) => void;
}

interface GameFormData {
  gameName: string;
  numPlayers: string;
  numTeams: string;
  roomId: string;
  roomPassword: string;
  isCreate: boolean;
}

const GameForm: React.FC<GameFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<GameFormData>({
    gameName: '',
    numPlayers: '2',
    numTeams: '2',
    roomId: '',
    roomPassword: '',
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
      isCreate
    }));
  };

  return (
    <GameFormContainer>
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
          <Label htmlFor="gameName">Player Name</Label>
          <Input
            type="text"
            id="gameName"
            name="gameName"
            value={formData.gameName}
            onChange={handleChange}
            required
            
            placeholder="Enter your name"
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
