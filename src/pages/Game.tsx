import React, { useEffect, useState } from 'react';
import { GameDetailDisplay } from '../components/gameDetailDisplay';
import { LoadingSpinner } from '../components/loadingSpinner';
import { ConfirmationModal } from '../components/confirmationModal';
import { useGameLogic } from '../hooks/useGameLogic';
import { usePreloadImages } from '../hooks/usePreloadImages';
import HalloweenImages from '../assets/halloween';
import ChristmasImages from '../assets/christmas';
import HalloweenBackground from '../assets/halloween-background-illustration.jpg';
import ChristmasBackground from '../assets/christmas-background-illustration.jpg';
import SantaClaus from './../assets/013-santa-claus-1.png';
import PumpkinLogo from './../assets/pumpkinLogo.png';
import './../styles/game.scss';
import { useGameStore } from '../store/gameStore';
import { GameBoard } from '../components/gameBoard';

type ThemeAssets = {
    images: string[];
    logo: string;
    background: string | null;
};

const loadAssetsForTheme = (theme: string | null): ThemeAssets => {
    switch (theme) {
        case 'halloween':
            return {
                images: HalloweenImages,
                logo: PumpkinLogo,
                background: HalloweenBackground,
            };
        case 'christmas':
            return {
                images: ChristmasImages,
                logo: SantaClaus,
                background: ChristmasBackground,
            };
        default:
            return {
                images: [],
                logo:'',
                background: null,
            };
    }
};

const Game: React.FC<{ mode: string; theme: string | null }> = ({ mode, theme }) => {
    const [themeAssets, setThemeAssets] = useState<ThemeAssets>({
        images: [],
        logo: '',
        background: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const { attempts, gameTime, resetGame } = useGameStore();

    useEffect(() => {
        setIsLoading(true);
        const assets = loadAssetsForTheme(theme);
        setThemeAssets(assets);
        const imagesToPreload = [assets.background, ...assets.images].filter((img): img is string => img !== null);
        usePreloadImages(imagesToPreload).then(() => {
            setIsLoading(false);
        });
    }, [theme]);

    const { shuffledImages, isLoading: isGameLoading, handleTileClick, modalOpen, setModalOpen } = useGameLogic(mode, themeAssets.images);

    if (isLoading || isGameLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className={`game theme-${theme}`}>
            <div className="game-cards-container">
                <GameDetailDisplay />
                <GameBoard shuffledImages={shuffledImages} handleTileClick={handleTileClick} mode={mode} logo={themeAssets.logo} />
            </div>
            <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={() => {
                    resetGame();
                    setModalOpen(false);
                }}
                title="Congratulations!"
                message={`You finished the game with ${attempts} attempts in ${gameTime} seconds!`}
                confirmLabel="RESET GAME"
            />
        </div>
    );
};

export default Game;
