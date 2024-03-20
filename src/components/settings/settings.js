import React from 'react';
import styled from 'styled-components';

const SettingsSlideout = styled.div`
    position: absolute;
    top: 10%;
    background-color: white;
    padding: 20px;
    border-radius: 0 10px 10px 0;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    z-index: 1000;
    transform: ${(props) => props.isOpen ? "translateX(-100%)" : "translateX(0%)"};
    transition: transform 0.3s ease-in-out;

    & label {
        margin-left: 10px;
    }

    > div {
        margin: 0 0 10px 0;
    }
    `;

const BoardSizeDiv = styled.div`
    display: inline-grid;
    width: 100%;
    `;


function Settings({ isOpen = true, styleOptions = {}, setStyleOptions = () => { } }) {
    const { xColor, oColor, boardSize, backgroundColor } = styleOptions;

    const handleChange = (e) => {
        const name = e.target.name;
        setStyleOptions({ ...styleOptions, [name]: e.target.value });

        const json = JSON.stringify({ ...styleOptions, [name]: e.target.value });
        window.localStorage.setItem('styleOptions', json);
    }

    return (<SettingsSlideout isOpen={isOpen}>
        <BoardSizeDiv>
            <label for="boardSize">Board Size</label>
            <input
                name="boardSize"
                type="range"
                min=".5"
                max="2"
                step=".01"
                class="slider"
                value={boardSize}
                onChange={handleChange}></input>
        </BoardSizeDiv>

        <div>
            <input type="color" name="backgroundColor" value={backgroundColor} onChange={handleChange} />
            <label for="xColor">Background Color</label>
        </div>
        <div>
            <input type="color" name="xColor" value={xColor} onChange={handleChange} />
            <label for="xColor">X Color</label>
        </div>
        <div>
            <input type="color" name="oColor" value={oColor} onChange={handleChange} />
            <label for="oColor">O Color</label>
        </div>
    </SettingsSlideout>
    );
}

export default Settings;
