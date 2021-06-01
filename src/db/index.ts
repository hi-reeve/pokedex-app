import Dexie from "dexie";
import { PokemonsWithNickname } from "@/types/Pokemons";
export interface IPokemonDb extends PokemonsWithNickname {
    dbid?: number;
}
class PokemonAppDB extends Dexie {
    pokemon: Dexie.Table<IPokemonDb, number>;
    constructor() {
        super("MyPokemon");
        this.version(1).stores({
            pokemon: "++dbid,id,name,image,nickname",
		});
		
		this.version(2).stores({
			pokemon : "++dbid,id,name,image,url,nickname"
		})
        this.pokemon = this.table("pokemon");
    }
}

export const db = new PokemonAppDB();
