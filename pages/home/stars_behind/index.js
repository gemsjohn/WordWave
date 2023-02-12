import { useEffect, useState, useContext, useRef, useCallback } from 'react';

import { StarAnimation_0 } from './StarAnimation_0';
import { StarAnimation_1 } from './StarAnimation_1';
import { StarAnimation_2 } from './StarAnimation_2';
import { StarAnimation_3 } from './StarAnimation_3';
import { StarAnimation_4 } from './StarAnimation_4';
import { StarAnimation_5 } from './StarAnimation_5';

export const Index_Behind = () => {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setDisplay(true)

        return () => {
           setDisplay(false)
        };
    }, [])

    return (
        <>
        {display &&
            <>
            <StarAnimation_0 style={{ position: 'absolute', zIndex: -10 }} />
            <StarAnimation_1 style={{ position: 'absolute', zIndex: -10 }} />
            <StarAnimation_2 style={{ position: 'absolute', zIndex: -10 }} />
            <StarAnimation_3 style={{ position: 'absolute', zIndex: -10 }} />
            <StarAnimation_4 style={{ position: 'absolute', zIndex: -10 }} />
            <StarAnimation_5 style={{ position: 'absolute', zIndex: -10 }} />
            </>
        }
        </>
    )
}