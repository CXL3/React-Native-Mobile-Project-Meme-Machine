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

export const postComment = (memeId, author, text) => (dispatch) => {
  const newComment = {
    memeId,
    author,
    text,
  };
  const date = new Date();
  newComment.date = date.toISOString();
  setTimeout(() => dispatch(addComment(newComment)), 50);
};

export const fetchMemes = () => (dispatch) => {
  dispatch(memesLoading());

  return fetch(baseUrl + "memes")
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
    .then((memes) => dispatch(addMemes(memes)))
    .catch((error) => dispatch(memesFailed(error.message)));
};

export const memesLoading = () => ({
  type: ActionTypes.MEMES_LOADING,
});

export const memesFailed = (errMess) => ({
  type: ActionTypes.MEMES_FAILED,
  payload: errMess,
});

export const addMemes = (memes) => ({
  type: ActionTypes.ADD_MEMES,
  payload: memes,
});

export const postUpvote = (memeId) => (dispatch) => {
  setTimeout(() => {
    dispatch(addUpvote(memeId));
  }, 500);
};

export const addUpvote = (memeId) => ({
  type: ActionTypes.ADD_UPVOTE,
  payload: memeId,
});
export const deleteUpvote = (memeId) => ({
  type: ActionTypes.DELETE_UPVOTE,
  payload: memeId,
});
