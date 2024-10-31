import { create } from "zustand";

interface GameHistoryEntry{
    attempts: number;
    gameDuration: string;
    date: string;
}

interface GameState{
    revealedTiles: number[];
    matchedPairs: number[];
    attempts: number;
    gameTime: number;
    isGameActive: boolean;
    gameHistory: GameHistoryEntry[];
    startGame: () => void
    revealTile: (tileIndex: number, isRevealed: boolean)=> void;
    matchPair: (pair: number[])=> void;
    incrementAttemps: ()=>void;
    resetGame: ()=>void;
    updateGameTime: (time: number) => void;
    saveGameToHistory: ()=>void;
    endGame: () => void;
}

export const useGameStore = create<GameState>((set)=>({
    playerName: null,
    revealedTiles: [],
    matchedPairs: [],
    attempts: 0,
    gameTime: 0,
    isGameActive: false,
    gameHistory: JSON.parse(localStorage.getItem('gameHistory') || '[]'),

    startGame: ()=>set({
        revealedTiles: [],
        matchedPairs: [],
        attempts: 0,
        gameTime: 0,
        isGameActive: true,
    }),
    revealTile: (index, isRevealed) => set((state) => {
        if (state.matchedPairs.includes(index)) {
            return state;
        }
        const newRevealedTiles = isRevealed
            ? [...state.revealedTiles, index]
            : state.revealedTiles.filter((i) => i !== index);
        
        return { revealedTiles: newRevealedTiles };
    }),
    matchPair: (pair:number[])=> set((state)=>({
        matchedPairs: [...state.matchedPairs, ...pair],
        revealedTiles: [],
    })),

    incrementAttemps: ()=>set((state)=>({
        attempts: state.attempts +1,
    })),
    resetGame: ()=>set({
        revealedTiles: [],
        matchedPairs: [],
        attempts: 0,
        gameTime: 0,
        isGameActive: true,
    }),
    updateGameTime: (time:number)=>set((state)=>({
        gameTime: state.gameTime + time,
    })),

    saveGameToHistory: ()=> set((state)=>{
        const currentDate = new Date().toISOString();
        const newGameEntry: GameHistoryEntry = {
            attempts: state.attempts,
            gameDuration: state.gameTime + "s",
            date: currentDate.slice(0,10),
        }
        const updatedHistory = [...state.gameHistory, newGameEntry]
        localStorage.setItem("gameHistory",JSON.stringify(updatedHistory));

        return {gameHistory: updatedHistory}
    }),

    endGame: () => set(()=>({
        isGameActive: false,
    }))

}))