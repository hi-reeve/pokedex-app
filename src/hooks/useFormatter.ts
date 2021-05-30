export const useFormatHeightToMeter = (height: number) => {
    return `${(height / 100).toFixed(2)}m`;
};

export const useFormatWeightToKilogram = (weight: number) => {
    return `${(weight / 10).toFixed(2)}kg`;
};

export const useFormatPokemonId = (id: number) => {
	return id.toString().padStart(5,"#000")
}