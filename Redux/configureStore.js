import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { memes } from "./memes";
import { comments } from "./comments";
import { upvotes } from "./upvotes";
import { Auth } from './auth';
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";


const config = {
  key: "root",
  storage,
  debug: true,
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      memes,
      comments,
      upvotes,
      auth: Auth,
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
