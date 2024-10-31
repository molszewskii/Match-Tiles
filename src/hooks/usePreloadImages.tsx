export const usePreloadImages = (imageUrls: string[]): Promise<void[]> => {
    return Promise.all(
        imageUrls.map((url) => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = () => resolve();
            });
        })
    );
};
