import styled from '@emotion/styled';


export const SuggestionContainer = styled.div<{displayProp:boolean, suggestiontype?: string}>`
  background-color: ${props => 
    props.suggestiontype === 'error' ? 'rgba(255, 0, 0, 0.85)' : 
    props.suggestiontype === 'sequence' ? 'rgb(0, 79, 0)' :
    'rgba(23, 23, 23, 0.85)'
  }; 
  text-align: center;

  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: absolute;
  min-width: 5%;
  width: 70%;
  top:10%;
  left:15%;
  zIndex: 1;
  opacity: ${(props) => props.displayProp ? 1 : 0};
  visibility: ${(props) => props.displayProp ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

export const SuggestionTexth = styled.h2`
padding: 2px;
  position: relative;
  text-align: center;
  color:  rgb(255, 255, 255);
  font-size: 1.2rem;
  font-weight: 500; 
 letter-spacing: 2px;

  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;


