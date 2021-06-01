export interface Pokemons {
    id: number;
    name: string;
    image: string;
    url: string;
    type?: PokemonType[];
}
export interface PokemonsWithNickname extends Pokemons {
    nickname: string;
}

export type PokemonsResponse = {
    pokemons: {
        count: number;
        next: string;
        previous: string;
        nextOffset: number;
        prevOffset: number;
        status: boolean;
        message: string;
        results: Pokemons[];
    };
};

export type PokemonType = {
    type: {
        name: string;
    };
};
export type PokemonMove = {
    move: {
        name: string;
        url: string;
    };
};

export type PokemonMoveDetail = {
    name: string;
    accuracy: number;
    power: number;
    pp: number;
	damage_class: {
		name: string;
	}
    effect_entries: {
        effect: string;
    }[];
    meta: {
        category: {
            name: string;
        };
        crit_rate: number;
    };
    type: {
        name: string;
    };
};
export type PokemonSprites = {
    front_default: string;
    back_default: string;
};
export type PokemonAbilities = {
    ability: {
        name: string;
    };
    is_hidden: boolean;
};
export type PokemonBaseStats = {
    base_stat: number;
    stat: {
        name: string;
    };
};
export type Pokemon = {
    id: number;
    name: string;
    weight: number;
    height: number;
    sprites: PokemonSprites;
    moves: PokemonMove[];
    types: PokemonType[];
    abilities: PokemonAbilities[];
    stats: PokemonBaseStats[];
};
