import React from 'react';
import { useGameStore } from '../store/gameStore';
import AttemptsIcon from './../assets/attemptsIcon.png';
import TimerIcon from './../assets/timerIcon.png';
import MatchedTilesIcon from './../assets/matchedTilesIcon.png';
import './../styles/detailDisplay.scss';
import { GameTimer } from './gameTimer';
import { DetailItem } from './detailItem';

export const GameDetailDisplay: React.FC = () => {
  const { attempts, matchedPairs } = useGameStore();
  
  return (
    <div className="detailDisplay-container">
      <DetailItem
        icon={AttemptsIcon}
        label="Attempts"
        value={attempts}
      />
      <DetailItem
        icon={TimerIcon}
        label="Time"
        value={<GameTimer />}
      />
      <DetailItem
        icon={MatchedTilesIcon}
        label="Matches"
        value={matchedPairs.length / 2}
      />
    </div>
  );
};
