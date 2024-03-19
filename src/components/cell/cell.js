import React from 'react';
import {X, O} from '../../assets/svgs';
import styled from 'styled-components';


const StyledCell = styled.div`
  width: ${(props) => props.size ? `${100*props.size}px` : "100px"};
  height: ${(props) => props.size ? `${100*props.size}px` : "100px"};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #999;
  border-radius: 10px;
  cursor: pointer;

  &:hover:empty {
    background-color: lightgray;
  }
`;


function Cell({ value, handleClick, styleOptions = {}}) {
  const { xColor, oColor, boardSize } = styleOptions;
    return (
        <StyledCell size={boardSize} className="cell" onClick={handleClick}>
            {value === 'X' && <X color={xColor} size={boardSize} />}
            {value === 'O' && <O color={oColor} size={boardSize} />}
        </StyledCell>
    );
}

export default Cell;
