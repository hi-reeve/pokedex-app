import { getPokemon, getPokemonVariable } from "@/graphql/queries/getPokemons";
import {
    Pokemon,
    Pokemons,
    PokemonsResponse,
    PokemonType,
} from "@/types/Pokemons";

import React, { Suspense, useEffect, useRef, useState } from "react";
import "@/pages/Home.css";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Spinner from "@/components/Loader/Spinner";
import styled from "@emotion/styled";
import { useToCapitalize } from "@/hooks/useFormatter";
import { useLiveQuery } from "dexie-react-hooks";
import { db, IAllPokemons } from "@/db";
import { addBulkPokemons } from "@/db/pokemon";

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
    position: relative;
    @media screen and (max-width: 525px) {
        flex-direction: column;
    }
`;
const SearchInput = styled.input`
    padding: 1rem;
    padding-left: 3rem;
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    &:focus {
        outline: none;
    }
`;

const NotFoundText = styled.p`
    font-size: 1rem;
    font-weight: bold;
`;

const fetchVariables: getPokemonVariable = {
    limit: 50,
    offset: 0,
};
const Home = () => {
    const [pokemonList, setPokemonList] = useState<Pokemons[]>([]);
    const { data, loading, getPokemonTrigger } = getPokemon(fetchVariables);
    const searchRef = useRef<HTMLInputElement>(null);

    const isFirstTime = JSON.parse(localStorage.getItem("first") ?? "true");
    const scrollPos = sessionStorage.getItem("scrollpos") ?? 0;
    let pokeLocal = useLiveQuery(() =>
        db.pokemons
            .offset(fetchVariables.offset)
            .limit(fetchVariables.limit)
            .toArray()
    );

    const handleFetchMore = async () => {
        fetchVariables.limit += 50;
        if (searchRef.current) {
            const keyword = searchRef.current.value.trim().toLowerCase();
            if (keyword === "") {
                pokeLocal = await db.pokemons
                    .offset(fetchVariables.offset)
                    .limit(fetchVariables.limit)
                    .toArray();
            } else {
                pokeLocal = await db.pokemons
                    .where("name")
                    .startsWith(keyword)
                    .offset(fetchVariables.offset)
                    .limit(fetchVariables.limit)
                    .toArray();
            }
        }
        if (pokeLocal) {
            setPokemonList(pokeLocal as IAllPokemons[]);
        }
    };

    useEffect(() => {
        if (isFirstTime == true) {
            getPokemonTrigger();
        }
    }, []);

    useEffect(() => {
        if (data) {
            addBulkPokemons(data.pokemons.results as IAllPokemons[]);
            handleFetchMore();
            localStorage.setItem("first", "false");
        }
    }, [data]);

    useEffect(() => {
        if (pokeLocal) {
            setPokemonList(() => pokeLocal as IAllPokemons[]);
        }

        return () => {
            setPokemonList(() => []);
        };
    }, [pokeLocal]);
    const { lastElemenRef } = useIntersectionObserver(handleFetchMore);

    useEffect(() => {
        if (scrollPos) {
            const timeout = setTimeout(() => {
                window.scrollTo(0, +scrollPos);
                sessionStorage.removeItem("scrollpos");
                clearTimeout(timeout);
            }, 100);
        }
    }, [scrollPos]);
    const handleClickLink = () => {
        sessionStorage.setItem("scrollpos", window.pageYOffset.toString());
    };

    const onInputSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value.trim().toLowerCase();
        if (keyword === "") {
            pokeLocal = await db.pokemons
                .offset(fetchVariables.offset)
                .limit(fetchVariables.limit)
                .toArray();
        } else {
            pokeLocal = await db.pokemons
                .where("name")
                .startsWith(keyword)
                .toArray();
        }
        if (pokeLocal) {
            setPokemonList(() => pokeLocal as IAllPokemons[]);
        }
    };
    if (loading) return <Loader />;

    if (pokeLocal && pokeLocal.length === 0) return <Loader />;

    return (
        <Suspense fallback={<Spinner />}>
            <TopContainer>
                <TitleIntro>
                    Simple pokedex app for pokemon lovers
                    <FilterContainer>
                        <SearchInput
                            type="text"
                            placeholder="Find pokemon name"
                            ref={searchRef}
                            onChange={onInputSearch}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-search"
                            style={{
                                position: "absolute",
                                left: "10px",
                                bottom: "1rem",
                                width: "20px",
                                height: "20px",
                            }}
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </FilterContainer>
                </TitleIntro>
            </TopContainer>
            <div className="pokemon--container">
                {pokemonList.length > 0 &&
                    pokemonList.map((pokemon, index) => {
                        if (
                            pokemonList.length === index + 1 &&
                            pokemonList.length >= 50
                        ) {
                            return (
                                <Link
                                    ref={lastElemenRef}
                                    to={`/pokemon/${pokemon.name}`}
                                    key={pokemon.id}
                                    onClick={handleClickLink}
                                >
                                    <PokemonCard pokemon={pokemon} />
                                </Link>
                            );
                        } else {
                            return (
                                <Link
                                    to={`/pokemon/${pokemon.name}`}
                                    key={pokemon.id}
                                    onClick={handleClickLink}
                                >
                                    <PokemonCard pokemon={pokemon} />
                                </Link>
                            );
                        }
                    })}
                {pokemonList.length === 0 && (
                    <NotFoundText>
                        Can't find pokemon{" "}
                        {`"${searchRef.current?.value}"` ?? ""}
                    </NotFoundText>
                )}
            </div>
        </Suspense>
    );
};

export default Home;
