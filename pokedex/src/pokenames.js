import axios from "axios";


class PokemonData{
    constructor(){
        this.rawData = '';
    }
    getPokemonNames(){
        axios.get("https://pokeapi.co/api/v2/generation/1")
        .then((response) => {
        this.rawData = response.data;
        });
        }
}
export default PokemonData;