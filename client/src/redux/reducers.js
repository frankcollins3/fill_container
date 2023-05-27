import { combineReducers } from 'redux';

const initialState = {
  pokemon: 'test-pikachu',
  water: 'empty',
  API_URL: '',
  settings: false,
  LOGIN_TYPE: 'TEST_LOGIN_TYPE',
  ENV: {
    DATABASE_URL: 'TEST_URL',
    API: 'TEST_API',
    NODE_ENV: 'TEST_NODE_ENV',
    GOOGLE_ID: 'TEST_GOOGLE_ID',
  },
  USER: {
    USERNAME: 'testusername',
    EMAIL: 'testemail',
    PASSWORD: 'testpassword',
    AGE: 'testage',
    GOOGLE_ID: 'noneyet',
  },
};

const rootReducer = (state = initialState, action) => {
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
        case "SET_API_URL":        
            return {
              ...state,
              API_URL: action.payload,
            }
        case "TOGGLE_SETTINGS":
            return {
              ...state,
              settings: action.payload ? action.payload === false ? true : false : true 
            }
        case "SET_LOGIN_TYPE":
            return {
              ...state,
              LOGIN_TYPE: action.payload
            }
            default:
              return state;
      }
};

export default combineReducers({
  // Add your reducers here if you have multiple reducers
  rootReducer,
});