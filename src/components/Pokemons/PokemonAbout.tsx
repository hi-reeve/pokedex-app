import { Pokemon } from "@/types/Pokemons";
import styled from "@emotion/styled";
import React from "react";

const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const AboutWrapper = styled.div`
    display: flex;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    flex-direction: row;
`;

type AbouTitleProps = {
    color: string;
};
const AboutTitle = styled.h5<AbouTitleProps>`
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    flex: 0.5;
    color: ${({ color }) => `var(--nature-${color})`};
`;

const AboutListWrapper = styled.ul`
    list-style-type: none;
    flex: 1;
`;

const AboutListItem = styled.li`
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
`;

const AboutLabel = styled.p`
    font-weight: 400;
    flex: 1;
    margin: 0;
    display: block;
`;
type Props = {
    pokemon: Pokemon;
};
const PokemonAbout: React.FC<Props> = ({ pokemon }) => {
    return (
        <AboutContainer>
            <AboutWrapper>
                <AboutTitle color={pokemon.types[0].type.name}>
                    Height
                </AboutTitle>
                <AboutLabel>{pokemon.height / 100}m</AboutLabel>
            </AboutWrapper>
            <AboutWrapper>
                <AboutTitle color={pokemon.types[0].type.name}>
                    Weight
                </AboutTitle>
                <AboutLabel>{(pokemon.weight / 10).toFixed(2)} kg</AboutLabel>
            </AboutWrapper>
            <AboutWrapper>
                <AboutTitle color={pokemon.types[0].type.name}>
                    Abilities
                </AboutTitle>
                <AboutListWrapper>
                    {pokemon.abilities.map(ability => {
                        return (
                            <AboutListItem key={ability.ability.name}>
                                {ability.ability.name}{" "}
                                {ability.is_hidden ? "(hidden ability)" : ""}
                            </AboutListItem>
                        );
                    })}
                </AboutListWrapper>
            </AboutWrapper>
        </AboutContainer>
    );
};

export default PokemonAbout;
