import PokemonDetailInfo from "@/components/Pokemons/PokemonDetailInfo";
import { GET_POKEMON } from "@/graphql/queries/getPokemons";
import { Pokemon } from "@/types/Pokemons";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ToolbarBack } from "@/components/ui/Navbar/ToolbarElement";
import IconArrowLeft from "@/components/icon/IconArrowLeft";
import { Button } from "@/components/ui/Button";
import { Tab, Tabs } from "@/components/ui/Tab/Tab";
import PokemonAbout from "@/components/Pokemons/PokemonAbout";
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

    if (loading) return <p>loading...</p>;

    if (pokemon) {
        return (
            <>
                <ToolbarBack>
                    <Button onClick={() => history.goBack()}>
                        <IconArrowLeft fill="#fff" />
                    </Button>
                </ToolbarBack>
                <PokemonDetailInfo pokemon={pokemon} />
                <Tabs>
                    <Tab label="about" tabName="About">
                        <PokemonAbout pokemon={pokemon} />
                    </Tab>
                    <Tab label="stats" tabName="Stats">
                        <h6>stats pokemon</h6>
                    </Tab>
                    <Tab label="move" tabName="Move"></Tab>
                </Tabs>
            </>
        );
    }

    return <div>No result found</div>;
};

export default PokemonDetail;
