import { API, language }  from "./API.js";
import { capitalize } from "./Additions.js";

class Pokemon {
    constructor(id) {
        this.id = id;
    }

    static get total() {
        return 801;
    }

    storeName = name => {
        if(!name) return;
        name = capitalize(name);
        this.name = name;
    };


    storeMaleSprite = sprites => {
        if(!sprites?.front_default) return;
        this.maleSprite = sprites.front_default;
    };


    storeFemaleSprite = sprites => {
        if(!sprites?.front_female) return;
        this.femaleSprite = sprites.front_female;
    };


    storeType1 = types => {
        if(!types?.[0]?.type?.name) return;
        this.type1 = types[0].type.name;
    };


    storeType2 = types => {
        if(!types?.[1]?.type?.name) return;

        this.type2 = types[1].type.name;
    };


    storeCardData = async () => {
        const data = await this.cardFetch();

        this.storeName(data.name);
        this.storeMaleSprite(data.sprites);
        this.storeFemaleSprite(data.sprites);
        this.storeType1(data.types);
        this.storeType2(data.types);
    };
    

    cardFetch = async () => {
        return await fetch(API + "pokemon/" + this.id)
            .then(res => res.json());
    };

}


export const pokemons = new Array(Pokemon.total);


export function createPokemons() {
    for(let i = 0; i < pokemons.length; i++)
        pokemons[i] = new Pokemon(i + 1);
}

export default Pokemon;