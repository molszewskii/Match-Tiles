import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import './../styles/gameTimer.scss'
export const GameTimer: React.FC = () => {
    const { gameTime, updateGameTime, isGameActive } = useGameStore();
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isGameActive) {
            timer = setInterval(() => {
                updateGameTime(1);
            }, 1000);
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isGameActive, updateGameTime]);

    return (
        <div className='gameTimer-container'>
            <h2 className='timeDisplay'>{gameTime} s</h2>
        </div>
    );
};
