import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import GameRound from './GameRound';
import FullScreenBox from './FullScreenBox';
import {
    COMPLETED_NAMES_BEFORE_MAX_AMOUNT_OF_PICTURES,
    MIN_AMOUNT_OF_PICTURES,
    MAX_AMOUNT_OF_PICTURES,
} from './settings';

/**
 * The Game component is responsible for the game lifecycle.
 */
export default function Game({listOfNamesWithPictures, onComplete}) {
    // We maintain a list of completed people so we know which one to show,
    // and know when the game is completed.
    const [completed, setCompleted] = useState([]);
    const [score, setScore] = useState(0);

    // The game is over, notify the parent.
    function gameOver() {
        onComplete({
            numTotal: listOfNamesWithPictures.length,
            numCompleted: completed.length,
            numCorrect:score,
            numIncorrect:newCompleted.length - score
        });
    }

    // The user picked the right option! Go to the next round or end the game.
    function nextRound(winner,result) {
        const newCompleted = [...completed, winner];
        const oldScore = score + 1;
        if(result){
            setScore(oldScore);
        }
        console.log('OldScore', oldScore, 'Score = ', score);
        if (newCompleted.length === listOfNamesWithPictures.length) {
            // The game is won! All names are correctly picked.
            onComplete({
                numTotal: listOfNamesWithPictures.length,
                numCompleted: newCompleted.length,
                numCorrect:oldScore,
                numIncorrect:newCompleted.length - oldScore
            });
        } else {
            // The game is not won yet, the next round will now be shown.
            setCompleted(newCompleted);
        }
    }

    // Below we will determine the data neccessary for a game round which includes:
    // 1. (winner) The winner
    // 2. (options) The options including the winner
    // 3. (roundTimeMs) How much time the round needs to be completed in.

    // First, get the people that have not been completed yet.
    const notCompleted = _.differenceBy(listOfNamesWithPictures, completed, 'recordId');

    // Next, determine the winner by random.
    const winner = _.sample(notCompleted);
    console.log('winner=',winner);

    // Next, create a list without the winner.
    const listOfNamesWithPicturesWithoutTheWinner = _.differenceBy(
        listOfNamesWithPictures,
        [winner],
        'recordId',
    );

    // The game gets harder over time! More options, and less time!
    const optionCount = 4;
        // completed.length <= COMPLETED_NAMES_BEFORE_MAX_AMOUNT_OF_PICTURES
        //     ? MIN_AMOUNT_OF_PICTURES
        //     : MAX_AMOUNT_OF_PICTURES;
    const normalizedProgress = completed.length / listOfNamesWithPictures.length;
    //const roundTimeMs = 5000 - normalizedProgress * 3000;
    const roundTimeMs = 5000 - normalizedProgress * 3000;


    // Next, sample some options from the list without the winner.
    // const sampledOptionsWithoutTheWinner = _.sampleSize(
    //     listOfNamesWithPicturesWithoutTheWinner,
    //     optionCount - 1,
    // );

    // Finally, shuffle the winner with the sampled options.
    const options = [winner.opt1,winner.opt2,winner.opt3,winner.opt4];
    

    return (
        <FullScreenBox display="flex">
            <GameRound
                // We use a key here to make the component re-mount each round.
                // This is simpler than resetting state within the component.
                key={winner.recordId}
                options={options}
                answer = {winner.answer}
                question={winner.question}
                roundTimeMs={roundTimeMs}
                numCompleted={completed.length}
                numTotal={listOfNamesWithPictures.length}
                onSuccess={() => nextRound(winner,true)}
                // onFail={gameOver}
                onFail ={() => nextRound(winner,false)}
            />
        </FullScreenBox>
    );
}

Game.propTypes = {
    listOfNamesWithPictures: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string.isRequired,
            recordId: PropTypes.string.isRequired,
            opt1: PropTypes.string.isRequired,
            opt2: PropTypes.string.isRequired,
            opt3: PropTypes.string.isRequired,
            opt4: PropTypes.string.isRequired,
            answer: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
    onComplete: PropTypes.func.isRequired,
};
