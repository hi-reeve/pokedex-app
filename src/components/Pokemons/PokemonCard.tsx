import { Pokemons } from "@/types/Pokemons";
import React from "react";

import styled from "@emotion/styled";

const PokemonContainer = styled.div`
    background: white;
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    position: relative;
    box-shadow: var(--shadow);
    border-radius: var(--rounded);
    @media screen and (max-width: 525px) {
        max-height: 150px;
        min-height: 100px;
    }
`;

const PokemonImage = styled.img`
    max-width: 50%;
	width: 100%;
	height: 100%;
    margin-left: auto;
`;

const PokemonName = styled.h2`
    font-weight: bold;
    font-size: 1.2rem;
`;

const PokemonInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;
const PokemonId = styled.h5`
    font-weight: bold;
    font-size: 0.8rem;
`;

const PokemonOwned = styled.p`
    font-size: 0.7rem;
    margin-top: 0.5rem;
`;

type Props = {
    pokemon: Pokemons;
};
const PokemonCard: React.FC<Props> = ({ pokemon }) => {
    return (
        <PokemonContainer>
            <PokemonInfoContainer>
                <PokemonId>
                    {pokemon.id.toString().padStart(5, "#000")}
                </PokemonId>
                <PokemonName>{pokemon.name}</PokemonName>
                <PokemonOwned>Owned : 0</PokemonOwned>
            </PokemonInfoContainer>
			<PokemonImage src={pokemon.image} alt={pokemon.name} loading="lazy" width="100%" height="100%" />
        </PokemonContainer>
    );
};

export default PokemonCard;
