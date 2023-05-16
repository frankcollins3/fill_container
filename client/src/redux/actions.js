const setPokemon = (newPokemon) => {
    return {
        type: "SET_POKEMON",
        payload: newPokemon
    }
}

const GET_WATER_BOTTLE = () => {
    let water = ['aquafina', 'dasani', 'fuji', 'polandspring'];
    let randomwater = water[Math.floor(Math.random() * water.length)]
    return {
        type: "GET_WATER_BOTTLE",
        payload: randomwater
    }
}

const slowpoke = () => {
    // console.log('slowpoke')
    return "Slowpoke"
}

const actionObject = {
    setPokemon: setPokemon,
    slowpoke: slowpoke,
    GET_WATER_BOTTLE: GET_WATER_BOTTLE
}

export default actionObject
