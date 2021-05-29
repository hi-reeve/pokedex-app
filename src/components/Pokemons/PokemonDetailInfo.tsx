import { Pokemon } from "@/types/Pokemons";
import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";

type PokemonInfoContainerProps = {
    color: string;
};
const PokemonInfoContainer = styled.div<PokemonInfoContainerProps>`
    display: flex;
    width: 100%;
    padding: 2rem;
    background: ${({ color }) => `var(--nature-${color}-light)`};
`;

const PokemonImage = styled.img`
    flex: 1;
    max-width: 50%;
	width: 100%;
	height: 100%;
`;

const PokemonDetailContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    padding-left: 1rem;
`;

const PokemonName = styled.h1`
    font-size: 1.5rem;
    color: white;
`;
const PokemonId = styled.h6`
    font-size: 0.75rem;
    color: white;
`;
const PokemonOwned = styled.p`
    font-size: 0.7rem;
    margin-top: 0.5rem;
    color: white;
    font-weight: bold;
`;

const PokemonNatureContainer = styled.div`
    display: flex;
`;

const PokemonNature = styled.div<PokemonNatureProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ type }) => `var(--nature-${type})`};
    padding: 0.25rem 0.5rem;
    margin: 0.5rem 0.25rem 0.5rem 0;
    border-radius: var(--rounded);
    box-shadow: var(--shadow);
`;
const PokemonNatureIcon = styled.img`
    width: 24px;
    height: 24px;
`;
type PokemonNatureProps = {
    type: string;
};
const PokemonNatureName = styled.div`
    color: white;
    margin-left: 0.25rem;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 0.8rem;
`;

type Props = {
    pokemon: Pokemon;
};
const PokemonDetailInfo: React.FC<Props> = ({ pokemon }) => {
    const [currentImage, setCurrentImage] = useState(
        pokemon.sprites.front_default
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentImage === pokemon.sprites.front_default)
                setCurrentImage(pokemon.sprites.back_default);
            else setCurrentImage(pokemon.sprites.front_default);

            clearTimeout(timeout);
        }, 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [currentImage]);
    return (
        <>
            <PokemonInfoContainer color={pokemon.types[0].type.name}>
                <PokemonImage
                    src={currentImage}
                    alt={pokemon.name}
                    loading="lazy"
                    width="100%"
                    height="100%"
                />
                <PokemonDetailContainer>
                    <PokemonId>
                        {pokemon.id.toString().padStart(4, "#000")}
                    </PokemonId>
                    <PokemonName>{pokemon.name}</PokemonName>
                    <PokemonNatureContainer>
                        {pokemon.types.map(type => {
                            return (
                                <PokemonNature
                                    type={type.type.name}
                                    key={type.type.name}
                                >
                                    <PokemonNatureIcon
                                        src={`/icon/${type.type.name}-type-icon.svg`}
                                        alt={type.type.name}
                                        width="24px"
                                        height="24px"
                                    />
                                    <PokemonNatureName>
                                        {type.type.name}
                                    </PokemonNatureName>
                                </PokemonNature>
                            );
                        })}
                    </PokemonNatureContainer>
                    <PokemonOwned>Owned : 0</PokemonOwned>
                </PokemonDetailContainer>
            </PokemonInfoContainer>
        </>
    );
};

export default PokemonDetailInfo;
