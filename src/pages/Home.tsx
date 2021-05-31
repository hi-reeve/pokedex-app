import { getPokemon, getPokemonVariable } from "@/graphql/queries/getPokemons";
import { Pokemons, PokemonsResponse } from "@/types/Pokemons";

import React, { Suspense, useEffect, useState } from "react";
import "@/pages/Home.css";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Spinner from "@/components/Loader/Spinner";
import styled from "@emotion/styled";

const PokemonCard = React.lazy(
    () => import("@/components/Pokemons/PokemonCard")
);

const fetchVariables: getPokemonVariable = {
    limit: 20,
    offset: 0,
};

const PIntro = styled.p`
    font-size: 0.9rem;
	margin: 2rem 2rem 0 2rem;
`;
const Home = () => {
    const [pokemonList, setPokemonList] = useState<Pokemons[]>([]);
    const { data, error, loading, fetchMore } = getPokemon(fetchVariables);
    const convertData = (newData: PokemonsResponse | undefined) => {
        if (newData) {
            const {
                pokemons: { status, results, next, count },
            } = newData;

            if (status && next && results.length !== count) {
                setPokemonList(pokemons => {
                    return [...pokemons, ...results];
                });
            }
        }
    };

    useEffect(() => {
        convertData(data);

        return () => {
            fetchVariables.offset = 0;
            setPokemonList([]);
        };
    }, [data]);

    const handleFetchMore = async () => {
        fetchVariables.offset += fetchVariables.limit;
        const { data: fetchMoreData } = await fetchMore({
            variables: fetchVariables,
        });
        convertData(fetchMoreData);
    };

    const { lastElemenRef } = useIntersectionObserver(handleFetchMore);

    if (error) return <p>Error {error.message}</p>;

    if (loading) return <Loader />;

    return (
        <>
            <Suspense fallback={<Spinner />}>
                <PIntro>Find your favorite pokemon and catch 'em all!</PIntro>
                <div className="pokemon--container">
                    {pokemonList.map((pokemon, index) => {
                        if (pokemonList.length === index + 1) {
                            return (
                                <Link
                                    ref={lastElemenRef}
                                    to={`/pokemon/${pokemon.name}`}
                                    key={pokemon.id}
                                >
                                    <PokemonCard pokemon={pokemon} />
                                </Link>
                            );
                        } else {
                            return (
                                <Link
                                    to={`/pokemon/${pokemon.name}`}
                                    key={pokemon.id}
                                >
                                    <PokemonCard pokemon={pokemon} />
                                </Link>
                            );
                        }
                    })}
                </div>
            </Suspense>
        </>
    );
};

export default Home;
