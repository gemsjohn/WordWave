import { useEffect, useState, useContext, useRef, useCallback } from 'react';

import { StarAnimation_0_top } from './StarAnimation_0';
import { StarAnimation_1_top } from './StarAnimation_1';
import { StarAnimation_2_top } from './StarAnimation_2';
import { StarAnimation_3_top } from './StarAnimation_3';
import { StarAnimation_4_top } from './StarAnimation_4';
import { StarAnimation_5_top } from './StarAnimation_5';

export const Index_Top = () => {
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
            <StarAnimation_0_top style={{ position: 'absolute', zIndex: 10 }} />
            <StarAnimation_1_top style={{ position: 'absolute', zIndex: 10 }} />
            <StarAnimation_2_top style={{ position: 'absolute', zIndex: 10 }} />
            <StarAnimation_3_top style={{ position: 'absolute', zIndex: 10 }} />
            <StarAnimation_4_top style={{ position: 'absolute', zIndex: 10 }} />
            <StarAnimation_5_top style={{ position: 'absolute', zIndex: 10 }} />
            </>
        }
        </>
    )
}