import { combineReducers, createStore } from "redux";
import reducers from "src/Redux/reducers";

const store = createStore(combineReducers({ ...reducers }));

export default store;
