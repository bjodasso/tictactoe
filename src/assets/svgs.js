import React from 'react';
import styled, { keyframes } from 'styled-components';

const fallOntoBoard = keyframes`
  0% {
    transform: translateY(0%) translateX(0%) scale(8);
    opacity: 0;
  }
  60% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const StyledSVG = styled.svg`
  animation: ${fallOntoBoard} 0.6s;
`;

// SVG for "X"
const X = ({color, size}) => (
  <StyledSVG width={size*100} height={size*100} xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="none" />
    <line x1={size*10} y1={size*10} x2={size*90} y2={size*90} stroke={color} strokeWidth={size*10}/>
    <line x1={size*90} y1={size*10} x2={size*10} y2={size*90} stroke={color} strokeWidth={size*10} />
  </StyledSVG>
);

// SVG for "O"
const O = ({color, size}) => (
  <StyledSVG width={size*100} height={size*100} xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="none" />
    <circle cx={size*50} cy={size*50} r={size*40} stroke={color} strokeWidth={size*10} fill="none"/>
  </StyledSVG>
);

export { X, O };
