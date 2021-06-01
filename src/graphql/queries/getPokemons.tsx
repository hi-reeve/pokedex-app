import { PokemonsResponse } from "@/types/Pokemons";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            nextOffset
            next
            count
            status
            message
            results {
                id
                name
                image
				url
            }
        }
    }
`;

export type getPokemonVariable = {
    limit: number;
    offset: number;
};
export const getPokemon = (variable: getPokemonVariable) => {
    const { data, loading, error, fetchMore, networkStatus } =
        useQuery<PokemonsResponse>(GET_POKEMONS, {
            variables: variable,
        });

    return {
        data,
        loading,
        error,
        fetchMore,
        networkStatus,
    };
};
