import React, { useState } from 'react';
import Board from '../board/board';
import styled from 'styled-components';

const StyledLayout = styled.div`
    overflow: hidden;
    height: 100vh;
    background-color: #92e2c2;
`;

const StyledH1 = styled.h1`
    text-align: center;
    font-size: 3rem;
    `;    

const StyledH2 = styled.h2`
    text-align: center;
    `;

const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const defaultArray = [null, null, null, null, null, null, null, null, null];

function Layout() {
    const [gameState, setGameState] = useState(defaultArray);
    const [xTurn, setXTurn] = useState(true);
    const [isDraw, setIsDraw] = useState(false);
    const [isWinner, setIsWinner] = useState("");
    const [styleOptions, setStyleOptions] = useState({boardSize: 2, xColor: 'black', oColor: 'black'});

    const handleClick = (i) => {
        const gameStateCopy = [...gameState];
        const isWinner = calculateWinner(gameStateCopy);
        if (isWinner || gameStateCopy[i]) {
            setIsWinner(isWinner);
            return;
        } else if (!gameStateCopy.includes(null)) {
            setIsDraw(true);
        }
        gameStateCopy[i] = xTurn ? 'X' : 'O';
        setGameState(gameStateCopy);
        setXTurn(!xTurn);
    }

    const calculateWinner = (currentCells) => {
        for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
            const [cell1, cell2, cell3] = WINNING_CONDITIONS[i];
            if (currentCells[cell1] && currentCells[cell1] === currentCells[cell2] && currentCells[cell1] === currentCells[cell3]) {
                return currentCells[cell1];
            } 
        }
        return null;
    }

    const resetGame = () => {   
        setGameState(defaultArray);
        setXTurn(true);
        setIsDraw(false);
    }

    return (
        <StyledLayout>
            <div>
                <StyledH1>Tic Tac Toe</StyledH1>
                <StyledH2>{isDraw ? `It's a Draw!` : isWinner ? `Winner: ${isWinner}` : `Next Player: ${xTurn ? 'X' : 'O'}`}</StyledH2>
            </div>
            <Board gameState={gameState} onClick={handleClick} styleOptions={styleOptions}/>
        </StyledLayout>
    );
}

export default Layout;