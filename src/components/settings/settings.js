import React from 'react';
import styled from 'styled-components';

const SettingsPopup = styled.div`
    position: absolute;
    top: 20%;
    right: 0;
    background-color: white;
    padding: 20px;
    border-radius: 10px 0 0 10px;
    box-shadow: 0 0 10px 0 #000000;
    z-index: 1000;
    transform: ${(props) => props.isOpen ? "translateX(0%)" : null};
    transition: transform 0.3s ease-in-out;

    & label {
        margin-left: 10px;
    }
    `;

const BoardSizeDive = styled.div`
    display: inline-grid;
    width: 100%;
    `;


function Settings({ isOpen = true, styleOptions = {}, setStyleOptions = () => { } }) {
    const { xColor, oColor, boardSize, backgroundColor } = styleOptions;

    const handleChange = (e) => {
        const name = e.target.name;
        setStyleOptions({ ...styleOptions, [name]: e.target.value });
    }

    return (isOpen ? <SettingsPopup isOpen={isOpen}>
        <BoardSizeDive>
            <label for="boardSize">Board Size</label>
            <input
                name="boardSize"
                type="range"
                min=".5"
                max="3"
                step=".01"
                class="slider"
                value={boardSize}
                onChange={handleChange}></input>
        </BoardSizeDive>

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
    </SettingsPopup> : null
    );
}

export default Settings;
