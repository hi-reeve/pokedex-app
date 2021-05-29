import gql from "graphql-tag";

export const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            nextOffset
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

export const GET_POKEMON = gql`
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
