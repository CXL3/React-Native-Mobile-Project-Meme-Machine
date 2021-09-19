import * as ActionTypes from "./ActionTypes";

export const memes = (
  state = { isLoading: true, errMess: null, memes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_MEMES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        memes: action.payload,
      };

    case ActionTypes.MEMES_LOADING:
      return { ...state, isLoading: true, errMess: null, memes: [] };

    case ActionTypes.MEMES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
