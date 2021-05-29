import React, { Suspense, useEffect, useState } from "react";
import { GET_POKEMON } from "@/graphql/queries/getPokemons";
import { Pokemon } from "@/types/Pokemons";
import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { ToolbarBack } from "@/components/ui/Navbar/ToolbarElement";
import { Button } from "@/components/ui/Button";
import { Tab, Tabs } from "@/components/ui/Tab/Tab";

import Loader from "@/components/Loader";

const IconArrowLeft = React.lazy(
    () => import("@/components/icon/IconArrowLeft")
);
const PokemonAbout = React.lazy(
    () => import("@/components/Pokemons/PokemonAbout")
);
const PokemonDetailInfo = React.lazy(
    () => import("@/components/Pokemons/PokemonDetailInfo")
);
const PokemonStats = React.lazy(
    () => import("@/components/Pokemons/PokemonStats")
);

const PokemonMoves = React.lazy(
    () => import("@/components/Pokemons/PokemonMoves")
);

type RouteParams = {
    name: string;
};
const PokemonDetail = () => {
    const routeParams: RouteParams = useParams();
    const [pokemon, setPokemon] = useState<Pokemon>();
    const history = useHistory();
    const { data, loading, error } = useQuery<{ pokemon: Pokemon }>(
        GET_POKEMON,
        {
            variables: {
                name: routeParams.name,
            },
        }
    );

    useEffect(() => {
        if (data) {
            setPokemon(data.pokemon);
        }
        return () => {
            setPokemon(undefined);
        };
    }, [data]);

    if (error) return <p>error {error.message}</p>;

    if (loading) return <Loader />;

    if (pokemon) {
        const color = pokemon.types[0].type.name;
        return (
            <>
                <Suspense fallback={<Loader />}>
                    <ToolbarBack>
                        <Button onClick={() => history.goBack()}>
                            <IconArrowLeft
                                fill="#fff"
                                width="24px"
                                height="24px"
                            />
                        </Button>
                    </ToolbarBack>
                    <PokemonDetailInfo pokemon={pokemon} />
                    <Tabs>
                        <Tab label="about" tabName="About">
                            <PokemonAbout pokemon={pokemon} />
                            <PokemonStats color={color} stats={pokemon.stats} />
                        </Tab>
                        <Tab label="move" tabName="Move">
                            <PokemonMoves color={color} moves={pokemon.moves} />
                        </Tab>
                    </Tabs>
                </Suspense>
            </>
        );
    }

    return <div>No result found</div>;
};

export default PokemonDetail;
