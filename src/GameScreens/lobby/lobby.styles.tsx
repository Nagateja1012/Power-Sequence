import styled from "@emotion/styled";

export const GameFormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const GameFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const ModeToggle = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const ToggleButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  background: ${(props) => (props.active ? "#007bff" : "none")};
  color: ${(props) => (props.active ? "white" : "#007bff")};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

export const StyledTitle = styled.h1`
  padding: 10px;
  animation: moveUp 3s ease-out forwards;
  position: relative;
  text-align: center;
  color: rgb(241, 145, 36);
  font-size: 2.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  @keyframes moveUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
