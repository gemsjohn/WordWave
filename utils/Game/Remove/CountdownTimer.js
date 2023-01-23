import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../../Styling';

export const CountdownTimer = () => {
    const [count, setCount] = useState(15);
    let intervalId;
    
    const startTimer = () => {
        intervalId = setInterval(() => {
          setCount(prevCount => {
            if (prevCount > 0) {
              return prevCount - 1;
            } else {
              clearInterval(intervalId);
              return 0;
            }
          });
        }, 1000);
    };
    startTimer();

  return count;
};
