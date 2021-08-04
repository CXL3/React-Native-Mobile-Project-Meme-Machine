import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { hotMemes } from './hotMemes';
import { comments } from './comments';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            hotMemes,
            comments
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}