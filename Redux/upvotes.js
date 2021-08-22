import * as ActionTypes from "./ActionTypes";

export const upvotes = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_UPVOTE:
      if (state.includes(action.payload)) {
        return state;
      }
      return state.concat(action.payload);
      
    case ActionTypes.DELETE_UPVOTE:
      return state.filter((upvote) => upvote !== action.payload);

    default:
      return state;
  }
};
