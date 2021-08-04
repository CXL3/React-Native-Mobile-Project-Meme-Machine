import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchCampsites = () => dispatch => {

    dispatch(hotMemesLoading());

    return fetch(baseUrl + 'hotMemes')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(hotMemes => dispatch(addCampsites(hotMemes)))
        .catch(error => dispatch(hotMemesFailed(error.message)));
};

export const hotMemesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const hotMemesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = hotMemes => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: hotMemes
});


