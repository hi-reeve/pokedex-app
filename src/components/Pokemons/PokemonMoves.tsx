import { useFormatMove } from "@/hooks/useFormatter";
import { PokemonMove } from "@/types/Pokemons";
import styled from "@emotion/styled";
import React from "react";
import {
    AboutContainer,
    AboutTitle,
    AboutWrapper,
} from "./PokemonDetailElement";

type Props = {
    moves: PokemonMove[];
    color: string;
};

const PokemonMoveBadgeWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    place-items: center;
    vertical-align: middle;
    width: 100%;
    gap: 1px;
    @media screen and (max-width: 991px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    @media screen and (max-width: 525px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media screen and (max-width: 320px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;
const PokemonMoveBadge = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0.5rem;
    /* box-shadow: var(--shadow); */
    border: 1px solid hsla(0, 0%, 0%, 0.5);
    font-size: 0.7rem;
`;

const PokemonMoves: React.FC<Props> = ({ color, moves }) => {
    const arrayMove = moves.map(move => move.move.name).sort();

    return (
        <AboutContainer>
            <AboutTitle color={color}>Move List Table</AboutTitle>
            <AboutWrapper>
                <PokemonMoveBadgeWrapper>
                    {arrayMove.map(moveName => (
                        <PokemonMoveBadge key={moveName}>
                            {useFormatMove(moveName)}
                        </PokemonMoveBadge>
                    ))}
                </PokemonMoveBadgeWrapper>
            </AboutWrapper>
        </AboutContainer>
    );
};

export default PokemonMoves;
