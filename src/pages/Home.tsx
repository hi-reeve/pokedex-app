import { GET_POKEMONS } from "@/graphql/queries/getPokemons";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Pokemons, PokemonsResponse } from "@/types/Pokemons";
import { useQuery } from "@apollo/client";
import React, { Suspense, useEffect, useState } from "react";
import "@/pages/Home.css";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";
const PokemonCard = React.lazy(
    () => import("@/components/Pokemons/PokemonCard")
);
const Home = () => {
    const [pokemonList, setPokemonList] = useState<Pokemons[]>([]);
    const [queryLimit, setQueryLimit] = useState<number>(10);
    const { data, loading, error, fetchMore } = useQuery<PokemonsResponse>(
        GET_POKEMONS,
        {
            variables: {
                limit: 20,
                offset: 0,
            },
        }
    );

    const convertData = (newData: PokemonsResponse | undefined) => {
        if (newData) {
            const {
                pokemons: { status, results },
            } = newData;
            if (status) {
                setPokemonList(results);
            }
        }
    };

    useEffect(() => {
        convertData(data);

        return () => {
            setQueryLimit(20);
            setPokemonList([]);
        };
    }, [data, queryLimit]);

    const handleFetchMore = async () => {
        const { data: fetchMoreData } = await fetchMore({
            variables: {
                limit: queryLimit,
            },
        });
        convertData(fetchMoreData);
    };
    // useInfiniteScroll({
    //     onLoadMore: handleFetchMore,
    // });

    if (error) return <p>Error {error.message}</p>;

    if (loading) return <Loader />;

    return (
        <>
            <Suspense fallback={<Loader />}>
                <div className="pokemon--container">
                    {pokemonList.map(pokemon => {
                        return (
                            <Link
                                to={`/pokemon/${pokemon.name}`}
                                key={pokemon.id}
                            >
                                <PokemonCard pokemon={pokemon} />
                            </Link>
                        );
                    })}
                </div>
                <div>Load More...</div>
            </Suspense>
        </>
    );
};

export default Home;
