
function GetPokeNumbers(num){
    // let pokemonid = [];
    // for(let x = 1; x <= 151; x++){
    //     pokemonid.push(x);
    // }
    // console.log(pokemonid);
    // return pokemonid;

    if(num <=0 || num > 151) {
        return "Number not valid";
    }
    return '';
}
export default GetPokeNumbers;

