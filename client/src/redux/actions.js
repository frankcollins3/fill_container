const setPokemon = (newPokemon) => {
    return {
        type: "SET_POKEMON",
        payload: newPokemon
    }
}

const slowpoke = () => {
    // console.log('slowpoke')
    return "Slowpoke"
}

const actionObject = {
    setPokemon: setPokemon,
    slowpoke: slowpoke
}

export default actionObject