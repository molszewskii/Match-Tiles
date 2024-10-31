import React from 'react';
import { Tile } from './tile';

interface GameBoardProps {
    shuffledImages: string[];
    handleTileClick: (image: string, index: number) => void;
    mode: string;
    logo: string;
}

export const GameBoard: React.FC<GameBoardProps> = ({ shuffledImages, handleTileClick, mode, logo }) => {
    return (
        <div className={`game-cards mode-${mode}`}>
            {shuffledImages.map((image, index) => (
                <Tile key={index} image={image} logo={logo} index={index} onClick={() => handleTileClick(image, index)} />
            ))}
        </div>
    );
};
