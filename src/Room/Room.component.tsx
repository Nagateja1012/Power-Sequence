import React, { useState, useEffect } from "react";

// Define TypeScript interfaces
interface Player {
  id: string;
  name: string;
  teamId: string | null; // Null if the player hasn't selected a team
}

interface Team {
  id: string;
  name: string;
}

interface RoomScreenProps {
  playersData: Player[];
  teamsData: Team[];
  currentPlayerId: string; // Add a prop to identify the current player
}

const RoomScreen: React.FC<RoomScreenProps> = ({
  playersData,
  teamsData,
  currentPlayerId,
}) => {
  const [players, setPlayers] = useState<Player[]>(playersData);
  const [waitingPlayers, setWaitingPlayers] = useState<Player[]>(
    playersData.filter((player) => !player.teamId)
  );
  const [teams, ] = useState<Team[]>(teamsData);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    // Enable "Next" button if all players are assigned to a team
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
    <div className="room-screen">
      <h1>Game Room</h1>
      
      <div className="waiting-block">
        <h2>Waiting Players</h2>
        {waitingPlayers.map((player) => (
          <div key={player.id}>
            {player.name}
            {/* Show the dropdown only for the current player */}
            {player.id === currentPlayerId && (
              <select
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
              </select>
            )}
          </div>
        ))}
      </div>

      <div className="team-blocks">
        {teams.map((team) => (
          <div key={team.id} className="team-block">
            <h2>{team.name}</h2>
            <ul>
              {players
                .filter((player) => player.teamId === team.id)
                .map((player) => (
                  <li key={player.id}>{player.name}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        disabled={!isNextEnabled}
        onClick={() => console.log("Proceeding to the next step")}
      >
        Next
      </button>
    </div>
  );
};

export default RoomScreen;
