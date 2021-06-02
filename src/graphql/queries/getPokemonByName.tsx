import { Pokemon } from "@/types/Pokemons";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_POKEMON = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            id
            name
            weight
            height
            sprites {
                front_default
                back_default
            }
            moves {
                move {
                    name
                    url
                }
            }
            types {
                type {
                    name
                }
            }
            abilities {
                ability {
                    name
                }
                is_hidden
            }
            stats {
                base_stat
                stat {
                    name
                }
            }
        }
    }
`;

export type GetPokemonByNameVariable = {
    name: string;
};
export const getPokemonByName = (variable: GetPokemonByNameVariable) => {
    const { data, loading, error } = useQuery<{ pokemon: Pokemon }>(
        GET_POKEMON,
        {
            variables: {
                name: variable.name,
            },
            fetchPolicy: "cache-first",
        }
    );
    return {
        data,
        loading,
        error,
    };
};
