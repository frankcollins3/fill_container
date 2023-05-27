const setPokemon = (newPokemon:string) => {
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
const SET_API_URL = async (url:string) => {
    
}
    let count = 0;
    const TOGGLE_SETTINGS = async (setting:boolean|null|undefined) => {
        count++

        if (setting === undefined || setting === null || !setting ) {
            return {
                type: "TOGGLE_SETTINGS",
                payload: true
            }
        } else {
            return {
                type: "TOGGLE_SETTINGS",
                payload: count % 2 === 0 ? false : true 
            }
        }
    }

const SET_LOGIN_TYPE = async (loginmethod:string) => {
    return {
        type: "SET_LOGIN_TYPE",
        payload: loginmethod
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
    GET_WATER_BOTTLE: GET_WATER_BOTTLE,
    TOGGLE_SETTINGS: TOGGLE_SETTINGS,
    SET_LOGIN_TYPE: SET_LOGIN_TYPE
}

export default actionObject