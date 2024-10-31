import React from 'react';
import { useGameStore } from '../store/gameStore';
import './../styles/tile.scss';

interface TileProps {
    image: string;
    logo?: string;
    index: number;
    onClick: () => void;
}

export const Tile: React.FC<TileProps> = ({ image, logo, index, onClick }) => {
    const { revealedTiles, matchedPairs } = useGameStore();
    const isFlipped = revealedTiles.includes(index) || matchedPairs.includes(index);
    const isMatch = matchedPairs.includes(index);
    const handleTileClick = () => {
        if (!isMatch) {
            onClick();
        }
    };

    return (
        <div className={`tile ${isFlipped ? 'flipped' : ''}`} onClick={handleTileClick}>
            <div className="tile-inner">
                <div className="tile-front">
                    <img src={logo} alt="Match Cards logo" className="tile-logo" />
                </div>
                <div className="tile-back">
                    <img src={image} alt="Tile back image" className="tile-image" />
                </div>
            </div>
        </div>
    );
};
