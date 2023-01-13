import React, { useEffect, useRef, useContext } from 'react';
import { SharedStateContext } from './Game';

export const Simple = () => {
    const { sharedState, setSharedState } = useContext(SharedStateContext);

    useEffect(() => {
        // This function will be called on every animation frame
        const update = () => {
            console.log(sharedState.current)

            requestAnimationFrame(update);
        };

        update();

        // Return a function that cleans up the effect
        return () => {
            // No need to do anything here
        };
    }, [])

}
