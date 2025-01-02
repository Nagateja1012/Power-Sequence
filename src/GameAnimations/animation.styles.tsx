import styled from '@emotion/styled';
export const AnimationDiv = styled.div<{display:boolean}>`
position: absolute;
top:45px;
left:45px;
zIndex: 1;
display: ${(props) => props.display ? 'block' : 'none'};
`;