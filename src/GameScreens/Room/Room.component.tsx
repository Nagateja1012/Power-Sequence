import React, { useState, useEffect } from "react";
import { Player } from "../models/model";
import { usePlayers } from "./Room.context";
import { useCurrentPlayer } from "./player.context";
import { NextButton, PlayerItem, PlayerList, PlayerListItem, RoomContainer, TeamBlock, TeamBlocks, TeamSelect, TeamTitle, Title, WaitingBlock, WaitingTitle } from "./Room.Styles";


interface RoomScreenProps {
  onClick: () => void;
}

interface Team {
  id: string;
  name: string;
}



const teamsData: Team[] = [{id:'1', name: 'Gold'},{id:'2', name: 'Silver'},{id:'3', name: 'Uranium'}]
const RoomScreen: React.FC<RoomScreenProps> = ({
  onClick
}) => {
  const { players: playersData } = usePlayers();
  console.log(playersData)
  const [players, setPlayers] = useState<Player[]>(playersData);
  const { currentPlayer, NumTeam} = useCurrentPlayer()
  const [waitingPlayers, setWaitingPlayers] = useState<Player[]>(
    playersData.filter((player) => !player.teamId)
  );
  
  const [teams, ] = useState<Team[]>(teamsData.slice(0, Number(NumTeam)));  
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    const allAssigned = players.every((player) => player.teamId !== null);
    setIsNextEnabled(allAssigned);
  }, [players]);

  const handleTeamSelect = (playerId: string, teamId: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId ? { ...player, teamId } : player
      )
    );

    setWaitingPlayers((prevWaiting) =>
      prevWaiting.filter((player) => player.id !== playerId)
    );
  };

  return (
    <RoomContainer>
      <Title>Game Room</Title>
      
      <WaitingBlock>
        <WaitingTitle>Waiting Players</WaitingTitle>
        {waitingPlayers.map((player) => (
          <PlayerItem key={player.id}>
            {player.name}
            {player.name === currentPlayer && (
              <TeamSelect
                onChange={(e) => handleTeamSelect(player.id, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Team
                </option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </TeamSelect>
            )}
          </PlayerItem>
        ))}
      </WaitingBlock>

      <TeamBlocks>
        {teams.map((team) => (
          <TeamBlock key={team.id}>
            <TeamTitle>{team.name}</TeamTitle>
            <PlayerList>
              {players
                .filter((player) => player.teamId === team.id)
                .map((player) => (
                  <PlayerListItem key={player.id}>{player.name}</PlayerListItem>
                ))}
            </PlayerList>
          </TeamBlock>
        ))}
      </TeamBlocks>

      <NextButton
        disabled={!isNextEnabled}
        onClick={() => onClick()}
      >
        Next
      </NextButton>
    </RoomContainer>
  );
};

export default RoomScreen;
