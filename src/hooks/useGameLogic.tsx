import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

interface SelectedImage {
    image: string;
    index: number;
}

export const useGameLogic = (mode: string, themeImages: string[]) => {
    const [shuffledImages, setShuffledImages] = useState<string[]>([]);
    const [selectedImage1, setSelectedImage1] = useState<SelectedImage | null>(null);
    const [selectedImage2, setSelectedImage2] = useState<SelectedImage | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const { incrementAttemps, matchPair, revealTile, matchedPairs, endGame, saveGameToHistory } = useGameStore();

    const requiredImageCount = mode === '4x3' ? 12 : mode === '5x4' ? 20 : 24;
    const uniqueImageCount = requiredImageCount / 2;

    useEffect(() => {
        const duplicateAndShuffleImages = (images: string[]) => {
            const selectedImages = images.slice(0, uniqueImageCount);
            const duplicatedImages = [...selectedImages, ...selectedImages];

            for (let i = duplicatedImages.length - 1; i > 0; i--) {
                const randomIndex = Math.floor(Math.random() * (i + 1));
                [duplicatedImages[i], duplicatedImages[randomIndex]] = [duplicatedImages[randomIndex], duplicatedImages[i]];
            }

            return duplicatedImages;
        };

        if (themeImages.length > 0) {
            const randomizedImages = duplicateAndShuffleImages(themeImages);
            setShuffledImages(randomizedImages);
            setIsLoading(false);
        }
    }, [mode, themeImages]);

    const handleTileClick = (image: string, index: number) => {
        if (selectedImage1 && selectedImage2) return;

        if (matchedPairs.includes(index)) return;

        if (!selectedImage1) {
            setSelectedImage1({ image, index });
            revealTile(index, true);
        } else {
            setSelectedImage2({ image, index });
            revealTile(index, true);
        }
    };

    useEffect(() => {
        if (selectedImage1 && selectedImage2) {
            if (selectedImage1.image === selectedImage2.image) {
                matchPair([selectedImage1.index, selectedImage2.index]);
                setSelectedImage1(null);
                setSelectedImage2(null);
            } else {
                setTimeout(() => {
                    revealTile(selectedImage1.index, false);
                    revealTile(selectedImage2.index, false);
                    setSelectedImage1(null);
                    setSelectedImage2(null);
                }, 1000);
            }
            incrementAttemps();
        }
    }, [selectedImage1, selectedImage2]);

    useEffect(() => {
        if (matchedPairs.length === requiredImageCount) {
            endGame();
            saveGameToHistory();
            setModalOpen(true);
        }
    }, [matchedPairs]);

    return { shuffledImages, isLoading, handleTileClick, modalOpen, setModalOpen };
};
