import * as ActionTypes from './ActionTypes';

export const upvotes = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_UPVOTE:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);

        default:
            return state;
    }
};