import { Pokemon } from "@/types/Pokemons";
import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import { useFormatPokemonId, useToCapitalize } from "@/hooks/useFormatter";
import {
    ReleaseButton,
    ReleaseButtonText,
    ReleaseIcon,
} from "../Button/ReleaseButton";
import useDeviceType from "@/hooks/useDeviceType";
type PokemonInfoContainerProps = {
    color: string;
};
const PokemonInfoContainer = styled.div<PokemonInfoContainerProps>`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 2rem;
    background: ${({ color }) => `var(--nature-${color}-light)`};
    @media screen and (max-width: 991px) {
        flex-direction: row;
        width: 100%;
    }
`;

const PokemonImage = styled.img`
    max-width: 50%;
    height: auto;
    margin-bottom: 1rem;
    @media screen and (max-width: 991px) {
        flex: 1;
    }
`;

const PokemonDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    @media screen and (max-width: 991px) {
        justify-content: center;
        flex: 1;
    }
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
    font-size: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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
    /* background: ${({ type }) => `var(--nature-${type})`}; */
    padding: 0.25rem 0.5rem;
    margin: 0.5rem 0.25rem 0.5rem 0;
    border-radius: var(--rounded);
    /* box-shadow: var(--shadow);
    cursor: pointer; */
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
    handleOnCatch: (e: React.MouseEvent) => void;
};

const PokemonDetailInfo: React.FC<Props> = ({ pokemon, handleOnCatch }) => {
    const [currentImage, setCurrentImage] = useState<string>(
        pokemon.sprites.front_default
    );

    const ownedNickname = useLiveQuery(() =>
        db.pokemon.where("name").equals(pokemon.name).toArray()
    );

    const { isTablet } = useDeviceType();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentImage === pokemon.sprites.front_default) {
                if (pokemon.sprites.back_default) {
                    setCurrentImage(pokemon.sprites.back_default);
                }
            } else {
                setCurrentImage(pokemon.sprites.front_default);
            }

            clearTimeout(timeout);
        }, 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [currentImage]);
    const color = pokemon.types[0].type.name;
    return (
        <>
            <PokemonInfoContainer color={color}>
                <PokemonImage
                    src={currentImage ?? "/images/no-pokemon.webp"}
                    alt={pokemon.name}
                    loading="lazy"
                    width="100%"
                    height="100%"
                    onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                        (e.target as HTMLImageElement).src =
                            "/images/no-pokemon.webp";
                    }}
                />
                <PokemonDetailContainer>
                    <PokemonId>{useFormatPokemonId(pokemon.id)}</PokemonId>
                    <PokemonName>{useToCapitalize(pokemon.name)}</PokemonName>
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
                    <PokemonOwned>
                        Owned : {ownedNickname ? ownedNickname.length : 0}
                    </PokemonOwned>
                    {!isTablet && (
                        <ReleaseButton bgColor={color} onClick={handleOnCatch}>
                            <ReleaseIcon
                                src="/icon/pokeball.svg"
                                alt="pokeball catch"
                            />
                            <ReleaseButtonText>
                                Catch this pokemon
                            </ReleaseButtonText>
                        </ReleaseButton>
                    )}
                </PokemonDetailContainer>
            </PokemonInfoContainer>
        </>
    );
};

export default PokemonDetailInfo;
