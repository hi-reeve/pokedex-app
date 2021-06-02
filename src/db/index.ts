import Dexie from "dexie";
import { Pokemons, PokemonsWithNickname, PokemonType } from "@/types/Pokemons";
export interface IPokemonDb extends PokemonsWithNickname {
    dbid?: number;
}

export interface IAllPokemons extends Pokemons {
    dbid?: number;
    type: PokemonType[];
}
class PokemonAppDB extends Dexie {
    pokemon: Dexie.Table<IPokemonDb, number>;
    pokemons: Dexie.Table<IAllPokemons, number>;
    constructor() {
        super("MyPokemon");
        this.version(1).stores({
            pokemon: "++dbid,id,name,image,nickname",
        });

        this.version(2)
            .stores({
                pokemon: "++dbid,id,name,image,url,nickname",
            })
            .upgrade(trans => {
                return trans
                    .table("pokemon")
                    .toCollection()
                    .modify(ownedPokemon => {
                        ownedPokemon.url = "";
                    });
            });
        this.version(3).stores({
            pokemon: "++dbid,id,name,image,url,nickname",
            pokemons: "++dbid,id,name,image,url",
        });
        this.pokemon = this.table("pokemon");
        this.pokemons = this.table("pokemons");
    }
}

export const db = new PokemonAppDB();
