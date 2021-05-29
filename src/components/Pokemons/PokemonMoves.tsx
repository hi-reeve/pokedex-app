import { PokemonMove } from "@/types/Pokemons";
import React from "react";
import {
    AboutContainer,
    AboutListItem,
    AboutListWrapper,
    AboutTitle,
    AboutWrapper,
} from "./PokemonDetailElement";

type Props = {
    moves: PokemonMove[];
    color: string;
};
const PokemonMoves: React.FC<Props> = ({ color, moves }) => {
    return (
        <AboutContainer>
            <AboutTitle color={color}>Move List</AboutTitle>
            <AboutWrapper>
                <AboutListWrapper>
                    {moves.map(move => (
                        <AboutListItem key={move.move.name}>
                            {move.move.name}
                        </AboutListItem>
                    ))}
                </AboutListWrapper>
            </AboutWrapper>
        </AboutContainer>
    );
};

export default PokemonMoves;
