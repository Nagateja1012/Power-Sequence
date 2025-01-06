import React, { useState, useEffect } from "react";
import { useCurrentPlayer } from "./player.context";
import { NextButton, PlayerItem, PlayerList, PlayerListItem, RoomContainer, RoomIdD, TeamBlock, TeamBlocks, TeamSelect, TeamTitle, Title, WaitingBlock, WaitingTitle } from "./Room.Styles";
import { Player } from "../../models/model";
import { useWebSocket } from "../../Services/websocket.services";


interface RoomScreenProps {
  onClick: () => void;
}

interface Team {
  id: string;
  name: string;
}

const teamsData: Team[] = [
  { id: '1', name: 'Gold' },
  { id: '2', name: 'Silver' },
  { id: '3', name: 'Uranium' }
];

const RoomScreen: React.FC<RoomScreenProps> = ({ onClick }) => {
  const { messages, sendMessage } = useWebSocket();
  const [players, setPlayers] = useState<Player[]>([]);

  const [waitingPlayers, setWaitingPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const { currentPlayer, RoomId, setRoomId } = useCurrentPlayer();

  useEffect(() => {
    if (messages?.[0]?.type === 'PlayerData') {
      const { roomId, numTeams, players: playersData } = messages[0].content;

      if (roomId && RoomId !== roomId) {
        setRoomId(roomId);
      }

      if (numTeams) {
        setTeams(teamsData.slice(0, Number(numTeams)));
      }

      if (playersData?.length) {
        setPlayers(playersData);
        setWaitingPlayers(playersData.filter((player: Player) => !player.teamId));
      }
    }
  }, [messages, RoomId, setRoomId]);

  useEffect(() => {
    const allAssigned = players.every(player => player.teamId !== null);
    const allTeamsHavePlayers = teams.every(team => 
      players.some(player => player.teamId === team.id)
    );
    setIsNextEnabled(allAssigned && allTeamsHavePlayers);
  }, [players, teams]);

  const handleTeamSelect = (playerId: string, teamId: string) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.playerId === playerId ? { ...player, teamId } : player
      )
    );

    setWaitingPlayers(prevWaiting =>
      prevWaiting.filter(player => player.playerId !== playerId)
    );

    sendMessage({
      action: "createGame",
      Message: {
        teamSelect: true,
        playerId,
        teamId,
        roomId: messages[0]?.content?.roomId
      }
    });
  };

  return (
    <RoomContainer>
      <Title>Game Room</Title>
      <RoomIdD>Room ID: {RoomId || ""}</RoomIdD>

      <WaitingBlock>
        <WaitingTitle>Waiting Players</WaitingTitle>
        {waitingPlayers.map(player => (
          <PlayerItem key={player.playerId}>
            {player.playerName}
            {player.playerId === currentPlayer && (
              <TeamSelect
                onChange={e => handleTeamSelect(player.playerId, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Select Team</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </TeamSelect>
            )}
          </PlayerItem>
        ))}
      </WaitingBlock>

      <TeamBlocks>
        {teams.map(team => (
          <TeamBlock key={team.id}>
            <TeamTitle>{team.name}</TeamTitle>
            <PlayerList>
              {players
                .filter(player => player.teamId === team.id)
                .map(player => (
                  <PlayerListItem key={player.playerId}>
                    {player.playerName}
                  </PlayerListItem>
                ))}
            </PlayerList>
          </TeamBlock>
        ))}
      </TeamBlocks>

      <NextButton disabled={!isNextEnabled} onClick={onClick}>
        Next
      </NextButton>
    </RoomContainer>
  );
};

export default RoomScreen;
