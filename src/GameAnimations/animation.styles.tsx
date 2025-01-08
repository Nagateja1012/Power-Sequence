import styled from '@emotion/styled';
export const AnimationDiv = styled.div<{displayProp:boolean}>`
position: absolute;
top:45px;
left:45px;
zIndex: 1;
display: ${(props) => props.displayProp ? 'block' : 'none'};
`;