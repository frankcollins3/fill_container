import {createStore} from 'redux';

// Define the initial state
const initialState = {
  pokemon: 'test-pikachu',
};

// Define the reducer function
const pokemonReducer = (state = initialState, action) => {
    
  switch (action.type) {
    case 'SET_POKEMON':
      return {
        ...state,
        pokemon: action.payload,
      };
    default:
      return state;
  }
};

// Create the store

const store = createStore(pokemonReducer) || "hey guys whatsup";
export default store;

// clientside use --->
// let pikachu = await actionObject.setPokemon("pikachu").payload