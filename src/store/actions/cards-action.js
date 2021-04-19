import { addCollectionAndDocs } from '../../firestore';

export const RESET_ERRORS = 'RESET_ERRORS';
export const SET_FORM_ERRORS = 'SET_FORM_ERRORS';
export const SET_STORED_CARD = 'SET_STORED_CARD';
export const SET_ERRORS = 'SET_ERRORS';
export const GET_STORED_CARDS = 'GET_STORED_CARDS';

export const resetErrors = (inputName) => (dispatch) => {
  dispatch({ type: RESET_ERRORS, payload: inputName });
};

export const setFormErrors = (inputName, text) => (dispatch) => {
  dispatch({ type: SET_FORM_ERRORS, inputName, text });
};

export const storeCardInDB = (key, cardDetails) => (dispatch) => {
  addCollectionAndDocs(key, cardDetails).catch((errors) =>
    dispatch({ type: SET_ERRORS, errors })
  );
};
export const getStoredCardsInDB = (data) => (dispatch) => {
  let storedCardsArray = [];
  if (!data.empty) {
    storedCardsArray = data.docs.map((doc) => {
      return {
        cardNumber: doc.id,
        ...doc.data(),
      };
    });
    dispatch({ type: GET_STORED_CARDS, payload: storedCardsArray });
  }
};
