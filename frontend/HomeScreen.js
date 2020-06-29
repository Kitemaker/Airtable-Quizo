import React from 'react';
import PropTypes from 'prop-types';

import IdleGameScreen from './IdleGameScreen';

/**
 * The HomeScreen is shown when the settings are valid and the player can start the game.
 */
export default function HomeScreen({onStartGame, onShowSettings}) {
    return (
        <IdleGameScreen
            emoji="👁 👁"
            title="Quizo"
            text="Each question will show multiple options. Please select the right answer. Lets Solve!"
            buttonLabel="Start game"
            onStartGame={onStartGame}
            onShowSettings={onShowSettings}
        />
    );
}

HomeScreen.propTypes = {
    onStartGame: PropTypes.func.isRequired,
    onShowSettings: PropTypes.func.isRequired,
};
