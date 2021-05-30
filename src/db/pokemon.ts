import { db } from "@/db";
import { PokemonsWithNickname } from "@/types/Pokemons";

export const addNewPokemon = async (payload: PokemonsWithNickname) => {
    await db.pokemon.add({
        id: payload.id,
        name: payload.name,
        nickname: payload.nickname,
        image: payload.image,
    });
};

export const checkExistingNickname = async (nickname: string) => {
    const response = await db.pokemon
        .where("nickname")
        .equals(nickname)
        .toArray();
    if (response.length > 0) return true;
    return false;
};

export const releasePokemon = async (id: number) => {
    await db.pokemon.delete(id);
};
