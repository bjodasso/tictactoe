import React, { useEffect, useState } from 'react';
import Board from '../board/board';
import Settings from '../settings/settings';
import styled from 'styled-components';
import useToggle from '../hooks/useToggle';
import { FaCog } from 'react-icons/fa';

const StyledLayout = styled.div`
    overflow: hidden;
    height: 100vh;
    background-color: ${(props) => props.color ? props.color : '#92e2c2'};
`;

const StyledH1 = styled.h1`
    text-align: center;
    font-size: 3rem;
    `;    

const StyledH2 = styled.h2`
    text-align: center;
    color: black;
    `;

const StatusMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.85);
    & h1 {
        color: #ffffff;
    }
    & button {
        background-color: #ffffff;
        color: #000000;
    }
    
    `;

const ResetButton = styled.button`
    margin-left: 10px;
    cursor: pointer;
    background-color: #000000;
    border: 2px solid #1A1A1A;
    border-radius: 15px;
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    color: #ffffff;
    padding: 10px 20px;
    `;
    
const Heading = styled.div`
    padding: 20px 0;
    text-align: center;
    `;

const StyledFaCog = styled(FaCog)`
    font-size: 2rem;
    position: absolute;
    left: 1em;
    top: 5%;
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
    const [settingsOpen, toggleSettingsOpen] = useToggle();
    const [styleOptions, setStyleOptions] = useState({boardSize: 1, xColor: 'black', oColor: 'black', backgroundColor: '#D5DDDA'});

    useEffect(() => {
        const localStyleOptions = JSON.parse(localStorage.getItem('styleOptions'));
        if (localStyleOptions) {
            setStyleOptions(localStyleOptions);
        }
    }, []);

    useEffect(() => {
        const winner = calculateWinner(gameState);
        if (winner) {
            setIsWinner(winner);
        } else if (!gameState.includes(null)) {
            setIsDraw(true);
        }
    }, [gameState]);

    const handleClick = (i) => {
        const gameStateCopy = [...gameState];
        
        if (calculateWinner(gameStateCopy) || gameStateCopy[i]) {
            return;
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
        setIsWinner("");
    }

    return (
        <StyledLayout color={styleOptions.backgroundColor}>
            <div>
                <Heading>
                    <StyledH1>Tic Tac Toe</StyledH1>
                </Heading>
                <StyledH2>{`Next Player: ${xTurn ? 'X' : 'O'}`}</StyledH2>
                {isDraw || isWinner ?
                <StatusMessage>
                    <StyledH1>{isDraw ? `It's a Draw!` : isWinner ? `${isWinner} Wins!` : null}</StyledH1>
                    {isDraw || isWinner ? <ResetButton onClick={resetGame}>Reset Game</ResetButton> : null}
                </StatusMessage> : null}
            </div>
            <Board gameState={gameState} onClick={handleClick} styleOptions={styleOptions}/>
            <StyledFaCog onClick={toggleSettingsOpen} style={{cursor: 'pointer'}} />
            <Settings setStyleOptions={setStyleOptions} styleOptions={styleOptions} isOpen={settingsOpen}/>
        </StyledLayout>
    );
}

export default Layout;