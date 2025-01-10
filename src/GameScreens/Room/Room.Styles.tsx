import styled from "@emotion/styled";
export const RoomContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

export const WaitingBlock = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
`;

export const WaitingTitle = styled.h2`
  color: #666;
  margin-bottom: 15px;
`;

export const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

export const TeamSelect = styled.select`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const TeamBlocks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const TeamBlock = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
`;

export const TeamTitle = styled.h2`
  color: #444;
  margin-bottom: 10px;
`;

export const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const PlayerListItem = styled.li`
  padding: 5px 0;
`;

export const NextButton = styled.button`
  display: block;
  width: 200px;
  margin: 0 auto;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #0056b3;
  }
`;

export const RoomIdD = styled.div`
  font-size: 1.2rem;
  color: #666;
  margin-top: -1rem;
  margin-bottom: 2rem;
  text-align: center;
  font-style: italic;
`;


export const ChangeButton = styled.button`
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
`;
