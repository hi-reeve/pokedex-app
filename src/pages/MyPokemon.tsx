import Loader from "@/components/Loader";
import { db } from "@/db";
import styled from "@emotion/styled";
import { useLiveQuery } from "dexie-react-hooks";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";

const PokemonCard = React.lazy(
    () => import("@/components/Pokemons/PokemonCard")
);
const MyPokemonContainer = styled.div`
    padding: 2rem;
`;
const MyPokemonTitle = styled.h1`
    margin: 2rem 0 0 2rem;
`;

const MyPokemonCount = styled.h4`
    margin: .5rem 0 0 2rem;
`;
const MyPokemon = () => {
    const myPokemons = useLiveQuery(() => db.pokemon.toArray());
    const ownedPokemon = useLiveQuery(() => db.pokemon.count());
    if (!myPokemons || myPokemons.length === 0)
        return (
            <MyPokemonContainer>
                <h4>You haven't catch any pokemon yet</h4>
            </MyPokemonContainer>
        );
    return (
        <>
            <Suspense fallback={<Loader />}>
                <MyPokemonTitle>My Pokemons</MyPokemonTitle>
                <MyPokemonCount>
                    Total pokemon owned : {ownedPokemon}
                </MyPokemonCount>
                <div className="pokemon--container">
                    {myPokemons.map(pokemon => (
                        <Link
                            to={`/pokemon/${pokemon.name}`}
                            key={pokemon.dbid}
                        >
                            <PokemonCard isMyPokemon pokemon={pokemon} />
                        </Link>
                    ))}
                </div>
            </Suspense>
        </>
    );
};

export default MyPokemon;
