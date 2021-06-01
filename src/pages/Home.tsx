import { getPokemon, getPokemonVariable } from "@/graphql/queries/getPokemons";
import {
    Pokemon,
    Pokemons,
    PokemonsResponse,
    PokemonType,
} from "@/types/Pokemons";

import React, { Suspense, useEffect, useState } from "react";
import "@/pages/Home.css";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Spinner from "@/components/Loader/Spinner";
import styled from "@emotion/styled";
import { useToCapitalize } from "@/hooks/useFormatter";

const PokemonCard = React.lazy(
    () => import("@/components/Pokemons/PokemonCard")
);

const TitleIntro = styled.h1`
    @media screen and (max-width: 525px) {
        font-size: 1.2rem;
        text-align: center;
    }
`;

const TopContainer = styled.div`
    margin: 2rem 2rem 0 2rem;
`;

const FilterContainer = styled.div`
    display: flex;
    margin-top: 1rem;
    @media screen and (max-width: 525px) {
        flex-direction: column;
    }
`;
const SearchInput = styled.input`
    padding: 1rem;
    width: 100%;
    border-radius: var(--rounded);
    border: none;
    border-bottom: 1px solid black;
    &:focus {
        outline: none;
    }
`;

const fetchVariables: getPokemonVariable = {
    limit: 20,
    offset: 0,
};
const Home = () => {
    const [pokemonList, setPokemonList] = useState<Pokemons[]>([]);
    const { data, error, loading, fetchMore } = getPokemon(fetchVariables);

    const convertData = (newData: PokemonsResponse | undefined) => {
        if (newData) {
            const {
                pokemons: { status, results, next, count },
            } = newData;

            if (status && next && results.length !== count) {
                results.map(async pokemon => {
                    const response = await fetch(pokemon.url);
                    const data = await response.json();
                    const pokeType = data.types.map((type: PokemonType[]) => {
                        return type;
                    });
                    const pokeObj = {
                        ...pokemon,
                        type: pokeType,
                    };

                    setPokemonList(pokemons => [...pokemons, pokeObj]);
                });

                // setPokemonList(pokemons => {
                //     return [...pokemons, ...results];
                // });
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

    if (error)
        return (
            <TopContainer>
                <p>Error {error.message}</p>
            </TopContainer>
        );

    if (loading) return <Loader />;

    if (pokemonList.length === 0)
        return (
            <TopContainer>
                <p>No pokemons</p>
            </TopContainer>
        );

    return (
        <Suspense fallback={<Spinner />}>
            <TopContainer>
                <TitleIntro>
                    Simple pokedex app for pokemon lovers
                    {/* <FilterContainer>
                        <SearchInput
                            type="text"
                            placeholder="Find pokemon name"
                        />
                    </FilterContainer> */}
                </TitleIntro>
            </TopContainer>
            <div className="pokemon--container">
                {pokemonList
                    .sort(({ id: a }, { id: b }) => a - b)
                    .map((pokemon, index) => {
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
    );
};

export default Home;
