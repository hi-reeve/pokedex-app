import { PokemonsResponse } from "@/types/Pokemons";
import { useLazyQuery, useQuery } from "@apollo/client";
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
    // const { data, loading, error, fetchMore, networkStatus } = useLazyQuery<
    //     PokemonsResponse,
    //     getPokemonVariable
    // >(GET_POKEMONS, {
    //     variables: {
    //         limit: 1200,
    //         offset: 0,
    //     },
    //     fetchPolicy: "cache-first",
    // });

    const [getPokemonTrigger, { data, loading }] = useLazyQuery<
        PokemonsResponse,
        getPokemonVariable
    >(GET_POKEMONS, {
        variables: {
            limit: 1200,
            offset: 0,
        },
        fetchPolicy: "cache-first",
    });

    return {
        data,
        loading,
        getPokemonTrigger,
    };
};
