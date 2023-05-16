import {applyMiddleware, createStore} from 'redux';

// Define the initial state
const initialState = {
  pokemon: 'test-pikachu',
  water: 'empty'  
};

// Define the reducer function
const fill_cont_reducer = (state = initialState, action) => {
    
  switch (action.type) {
    case 'SET_POKEMON':
      return {
        ...state,
        pokemon: action.payload,
      };  
    case 'GET_WATER_BOTTLE':
        let water = ['aquafina', 'dasani', 'fuji', 'polandspring'];
        let randomwater = water[Math.floor(Math.random() * water.length)]
        return {
          ...state,
// this doesn't have to be action.payload because we wont be returning the arg. The arg is the payload. Setpokemon needs that arg to set Pokemon
          water: randomwater
        };        
        default:
          return state;
  }
  
};

// Create the store

const store = createStore(fill_cont_reducer) || "hey guys whatsup";
export default store;

// clientside use --->
// let pikachu = await actionObject.setPokemon("pikachu").payload
