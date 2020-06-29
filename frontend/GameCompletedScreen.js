import React from 'react';
import PropTypes from 'prop-types';

import IdleGameScreen from './IdleGameScreen';

/**
 * The GameCompletedScreen is shown when the user wins or loses the game.
 */
export default function GameCompletedScreen({gameReport, onStartGame, onShowSettings}) {
    console.log('Game Report=', gameReport);
    const didUserWinTheGame = gameReport.numTotal === gameReport.numCorrect;
    return (
        <IdleGameScreen
            emoji={didUserWinTheGame ? '🏆' : '💀'}
            title={didUserWinTheGame ? '🎉 Quiz completed! 🎉' : '🙁 Quiz over! 🙁'}
            text={
                didUserWinTheGame
                    ? `Congrats, you solved all ${gameReport.numTotal} questions!`
                    : `You solved ${gameReport.numCorrect} out of ${gameReport.numTotal} questions`
            }
            buttonLabel={didUserWinTheGame ? 'Go again' : 'Try again'}
            onStartGame={onStartGame}
            onShowSettings={onShowSettings}
        />
    );
}

GameCompletedScreen.propTypes = {
    gameReport: PropTypes.shape({
        numCompleted: PropTypes.number.isRequired,
        numTotal: PropTypes.number.isRequired,
        numCorrect:PropTypes.number.isRequired,
        numIncorrect:PropTypes.number.isRequired

    }).isRequired,
    onStartGame: PropTypes.func.isRequired,
    onShowSettings: PropTypes.func.isRequired,
};
