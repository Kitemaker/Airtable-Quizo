import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Text, Box, Button,TextButton, Heading} from '@airtable/blocks/ui';

import Picture from './Picture';


import Latex  from 'react-latex';
import  MathJax  from 'react-mathjax2';
/**
 * The game round state describes the state of the game.
 */
const GameRoundStates = Object.freeze({
    /** The round has started, nothing is selected, time has not run out yet. */
    IDLE: 'idle',
    /** The player selected the right option within the time period. */
    SUCCESS: 'success',
    /** The player selected the wrong option, or failed to select an option within the time period. */
    FAIL: 'fail',
});

/**
 * The GameRound component is responsible for showing the options and allowing the player to select an option.
 * It also keeps track of time, when the user fails to pick an option within the time, it's a fail.
 */
export default function GameRound({
    options,
    question,
    numTotal,
    numCompleted,
    roundTimeMs,
    onSuccess,
    onFail,
    answer
}) {
    const [roundState, setRoundState] = useState(GameRoundStates.IDLE);
    const isRoundComplete = [GameRoundStates.SUCCESS, GameRoundStates.FAIL].includes(roundState);

    // Whenever `roundState` changes, we want to wait a second before going to the round or game state.
    // This allows the player to see which option was correct.
    useEffect(() => {
        let timeoutId;
        switch (roundState) {
            case GameRoundStates.SUCCESS: {
                timeoutId = setTimeout(() => {
                    console.log('Call onsuccess');
                    onSuccess();
                }, 1000);
                break;
            }
            case GameRoundStates.FAIL: {
                console.log('Call Failure');
                timeoutId = setTimeout(() => {
                    onFail();
                }, 1000);
                break;
            }
        }

        return () => {
            // It's a best practice to cleanup for unexpected unmounts of the component.
            clearTimeout(timeoutId);
        };

        // `onFail` and `onSuccess` are added as dependencies primarily to please eslint,
        // in practice only `roundState` will trigger the effect hook.
    }, [roundState, onFail, onSuccess]);

    function onSelect(index) {

        console.log('index = ', index + 1, 'answer', answer);
        // We compare names and not id's to work with people with the same name.
        setRoundState(index  === (answer - 1) ? GameRoundStates.SUCCESS : GameRoundStates.FAIL);
    }

    function onTimeEnd() {
        //setRoundState(GameRoundStates.FAIL);
    }

    // Sample some fun emojis to make the game more amusing.
    let emoji;
    if (isRoundComplete) {
        if (roundState === GameRoundStates.SUCCESS) {
            emoji = _.sample(['😍', '👌', '🤗', '🤙', '🤘', '😎', '👏']);
        } else if (roundState === GameRoundStates.FAIL) {
            emoji = _.sample(['🤯', '😵', '😯', '😫', '😩', '😓', '💩']);
        }
    } else {
        emoji = _.sample(['🤔', '🙃', '😅', '🧐', '👀', '🤭', '😕', '😧']);
    }

    const emojiClassNames = ['GameRoundEmoji'];
    if (isRoundComplete) {
        emojiClassNames.push('GameRoundEmoji-isRoundComplete');
    }
   
 
    return (

        <Box flex="auto" display="flex" flexDirection="column">
            <div>
            <html><head>
        <link
            href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
            rel="stylesheet"
        />
    </head>
</html></div>
            <Box flex="auto" alignSelf="top" textAlign="right" marginTop="4vh" paddingX={4} height="20px">              
                <Text size="large">
                Question.{numCompleted + 1} of {numTotal}
                </Text>     
               
            
                     
            </Box>
            <Box flex="auto" textAlign="center" marginTop="4vh" paddingX={4}>   

                <Heading textAlign="center" marginTop={2}>
                    <div> <Latex>{question}</Latex></div>
                   
                </Heading>  
              
            </Box>
            <Box flex="auto"  display="flex" flexDirection="column" alignItems="center">
                {options.map((option,index) => {
                    return (
                        <Box flex="none"  key={index} width="90%" padding="0px" display="flex" flexDirection="row" alignItems="center">
                          <Button  margin="0px" variant="primary" width="40px" size="large">
                                {index +1}
                            </Button>
                            <Button 
                                margin="10px"
                                variant="primary"  
                                onClick={() => onSelect(index)}
                                width="90%"                                         
                                size="large" isRoundComplete={isRoundComplete}
                                shouldPresentAsWinner={isRoundComplete && answer === index +1}
                                didUserPickSuccessfully={
                                    isRoundComplete && roundState === GameRoundStates.SUCCESS
                                }
                            >
                                {option}
                            </Button>
                        </Box>
             );
                })}
            </Box>
        </Box>
    );
}

GameRound.propTypes = {
    winnerName: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            largePictureUrl: PropTypes.string.isRequired,
            smallPictureUrl: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    numTotal: PropTypes.number.isRequired,
    numCompleted: PropTypes.number.isRequired,
    roundTimeMs: PropTypes.number.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onFail: PropTypes.func.isRequired,
};
