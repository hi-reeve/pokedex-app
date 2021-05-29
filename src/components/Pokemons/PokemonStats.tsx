import { PokemonBaseStats } from "@/types/Pokemons";
import React from "react";
import {
    AboutContainer,
    AboutLabel,
	AboutSubTitle,
    AboutTitle,
    AboutWrapper,
} from "./PokemonDetailElement";

type Props = {
    stats: PokemonBaseStats[];
    color: string;
};
const PokemonStats: React.FC<Props> = ({ color, stats }) => {
    return (
		<AboutContainer>
			<AboutTitle color={color}>Base Stats</AboutTitle>
            {stats.map(stat => (
                <AboutWrapper key={stat.stat.name}>
					<AboutSubTitle>{stat.stat.name }</AboutSubTitle>
                    <AboutLabel>{stat.base_stat}</AboutLabel>
                </AboutWrapper>
            ))}
        </AboutContainer>
    );
};

export default PokemonStats;
