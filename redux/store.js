import { createStore, applyMiddleware } from "redux";
import bigReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxLogger from "redux-logger";
import createSagaMiddeleware from "redux-saga";
import saga from "./saga/index";
const sagaMiddeleware = createSagaMiddeleware();
const store = createStore(
  bigReducer,
  composeWithDevTools(applyMiddleware(reduxLogger, sagaMiddeleware))
);
sagaMiddeleware.run(saga);
export default store;
