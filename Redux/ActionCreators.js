import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});
export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (hotMemeId, author, text) => (dispatch) => {
  const newComment = {
    hotMemeId,
    author,
    text,
  };
  const date = new Date();
  newComment.date = date.toISOString();
  setTimeout(() => dispatch(addComment(newComment)), 50);
};

export const fetchHotMemes = () => (dispatch) => {
  dispatch(hotMemesLoading());

  return fetch(baseUrl + "hotMemes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((hotMemes) => dispatch(addHotMemes(hotMemes)))
    .catch((error) => dispatch(hotMemesFailed(error.message)));
};

export const hotMemesLoading = () => ({
  type: ActionTypes.HOTMEMES_LOADING,
});

export const hotMemesFailed = (errMess) => ({
  type: ActionTypes.HOTMEMES_FAILED,
  payload: errMess,
});

export const addHotMemes = (hotMemes) => ({
  type: ActionTypes.ADD_HOTMEMES,
  payload: hotMemes,
});
