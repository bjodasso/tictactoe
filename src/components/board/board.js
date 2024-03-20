import React, { useState } from 'react';
import Cell from '../cell/cell';
import styled from 'styled-components';

const StyledBoard = styled.div`
    display: grid;
    grid-template-columns: ${(props) => props.size ? `repeat(3, ${100*props.size}px)` : `repeat(3, 100px)`};
    grid-template-rows: ${(props) => props.size ? `repeat(3, ${100*props.size}px)` : `repeat(3, 100px)`};
    gap: ${(props) => props.size ? `${10*props.size}px` : "10px"};
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    `;


function Board({ gameState = [], onClick, styleOptions = {}}) {

    const {boardSize} = styleOptions;
    return (
        <StyledBoard size={boardSize}>
            {
                gameState.map((value, i) => (
                    <Cell styleOptions={styleOptions} key={i} value={value} handleClick={() => onClick(i)} />
                ))
            }
        </StyledBoard>
    );
}

export default Board;