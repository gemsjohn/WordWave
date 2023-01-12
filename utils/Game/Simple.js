import React, { useEffect, useRef, useContext } from 'react';
import { SharedStateContext } from './Game';

export const Simple = (props) => {
    useEffect(() => {
        console.log(props)
    }, [props])
}
