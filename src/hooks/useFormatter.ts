export const useFormatHeightToMeter = (height: number) => {
    return `${(height / 100).toFixed(2)}m`;
};

export const useFormatWeightToKilogram = (weight: number) => {
    return `${(weight / 10).toFixed(2)}kg`;
};
