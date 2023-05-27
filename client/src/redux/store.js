import { createStore } from 'redux';
import rootReducer from './reducers'; // Import your root reducer

const store = createStore(rootReducer); // Create the Redux store using your root reducer

export default store;
