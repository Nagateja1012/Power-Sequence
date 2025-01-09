import styled from '@emotion/styled';
export const AnimationDiv = styled.div<{displayProp:boolean}>`
position: absolute;
top:10%;

zIndex: 1;
display: ${(props) => props.displayProp ? 'block' : 'none'};
`;
