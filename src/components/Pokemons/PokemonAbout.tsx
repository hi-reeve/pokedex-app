import { Pokemon } from "@/types/Pokemons";
import React from "react";
import {
    useFormatHeightToMeter,
    useFormatWeightToKilogram,
} from "@/hooks/useFormatter";
import {
    AboutContainer,
    AboutWrapper,
    AboutTitle,
    AboutLabel,
    AboutListWrapper,
    AboutListItem,
    AboutSubTitle,
} from "./PokemonDetailElement";

type Props = {
    pokemon: Pokemon;
};
const PokemonAbout: React.FC<Props> = ({ pokemon }) => {
    return (
        <AboutContainer>
            <AboutTitle color={pokemon.types[0].type.name}>
                Pokédex Data
            </AboutTitle>
            <AboutWrapper>
                <AboutSubTitle>Height</AboutSubTitle>
                <AboutLabel>
                    {useFormatHeightToMeter(pokemon.height)}
                </AboutLabel>
            </AboutWrapper>
            <AboutWrapper>
                <AboutSubTitle>Weight</AboutSubTitle>
                <AboutLabel>
                    {useFormatWeightToKilogram(pokemon.weight)}
                </AboutLabel>
            </AboutWrapper>
            <AboutWrapper>
                <AboutSubTitle>Abilities</AboutSubTitle>
                <AboutListWrapper>
                    {pokemon.abilities.map((ability, index) => {
                        return (
                            <AboutListItem key={ability.ability.name}>
                                {index + 1}
                                {". "}
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
