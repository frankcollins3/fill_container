const setPokemon = (newPokemon) => {
    return {
        type: "SET_POKEMON",
        payload: newPokemon
    }
}

const GET_WATER_BOTTLE = async () => {
    let water = ['aquafina', 'dasani', 'fuji', 'polandspring'];
    let randomwater = await water[Math.floor(Math.random() * water.length)]
    return {
        type: "GET_WATER_BOTTLE",
        payload: randomwater
    }
}
const SET_API_URL = async (url) => {
    
}

const TOGGLE_SETTINGS = async (setting) => {
    if (setting === undefined || !setting ) {
        return {
            type: "TOGGLE_SETTINGS",
            payload: true
        }
    } else {
        return {
            type: "TOGGLE_SETTINGS",
            payload: setting === false ? true : false
        }
    }
}

// settings: action.payload ? action.payload === false ? true : false : true 

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
