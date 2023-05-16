const axios = require('axios');

const allPokemon = async (req, res) => {
// this route invokes axios' get() -> return endpoint of predata.data.results which is array of original 151 pokemon
    try {
        let predata = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        let data = predata.data.results || []
        let friends = ['kevin', 'kelly', 'jason', 'jackie', 'abrar', 'melanie'];
        let randomfriend = friends[Math.floor(Math.random() * friends.length) ]
        res.json( { pokemon: data } )

    }
    catch {
        res.json( {error: 'theres been a mistake!'} )
    }

}

module.exports = allPokemon;