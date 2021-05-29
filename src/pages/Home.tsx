import { GET_POKEMONS } from "@/graphql/queries/getPokemons";
import { Pokemons, PokemonsResponse } from "@/types/Pokemons";
import { useQuery } from "@apollo/client";
import React, {
    Ref,
    Suspense,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import "@/pages/Home.css";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";
const PokemonCard = React.lazy(
    () => import("@/components/Pokemons/PokemonCard")
);

const fetchVariables = {
    limit: 50,
    offset: 0,
};
const Home = () => {
    const [pokemonList, setPokemonList] = useState<Pokemons[]>([]);
    const { data, loading, error, fetchMore } = useQuery<PokemonsResponse>(
        GET_POKEMONS,
        {
            variables: fetchVariables,
        }
    );

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
            setPokemonList(() => {
                return [];
            });
        };
    }, [data]);

    const handleFetchMore = async () => {
        fetchVariables.offset += fetchVariables.limit;
        const { data: fetchMoreData } = await fetchMore({
            variables: fetchVariables,
            // @ts-ignore
            updateQuery(prev, { fetchMoreResult }) {
                if (!fetchMoreResult) return prev;

                return {
                    pokemons: {
                        ...fetchMoreResult,
                        results: [
                            ...prev.pokemons.results,
                            fetchMoreResult.pokemons.results,
                        ],
                    },
                };
            },
        });
        convertData(fetchMoreData);
    };

    const observer = useRef<IntersectionObserver | null>();

    const lastElemenRef = useCallback(element => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                handleFetchMore();
            }
        });

        if (element) observer.current.observe(element);
    }, []);

    if (error) return <p>Error {error.message}</p>;

    if (loading) return <Loader />;

    return (
        <>
            <Suspense fallback={<Loader />}>
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
