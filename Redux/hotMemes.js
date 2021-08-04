import * as ActionTypes from "./ActionTypes";

export const hotMemes = (
  state = { isLoading: true, errMess: null, hotMemes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_CAMPSITES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        hotMemes: action.payload,
      };

    case ActionTypes.CAMPSITES_LOADING:
      return { ...state, isLoading: true, errMess: null, hotMemes: [] };

    case ActionTypes.CAMPSITES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
