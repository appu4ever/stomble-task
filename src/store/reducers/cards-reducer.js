import {
  RESET_ERRORS,
  SET_ERRORS,
  SET_CARD_DETAILS,
  RESET_CARD_DETAILS,
  SET_FORM_ERRORS,
  SET_STORED_CARD,
  GET_STORED_CARDS,
} from '../actions/cards-action';

const INITIAL_STATE = {
  details: {
    name: '',
    number: '',
    cvv: '',
    month: '',
    year: '',
  },
  formErrors: {
    name: { status: false, text: '' },
    number: { status: false, text: '' },
    cvv: { status: false, text: '' },
  },
  storedCards: [],
  errors: null,
};

export const cardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_ERRORS: {
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.payload]: { status: false, text: '' },
        },
      };
    }
    case SET_FORM_ERRORS: {
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.inputName]: { status: true, text: action.text },
        },
      };
    }
    case SET_CARD_DETAILS: {
      return {
        ...state,
        details: {
          ...state.details,
          [action.inputName]: action.inputValue,
        },
      };
    }
    case RESET_CARD_DETAILS: {
      return {
        ...state,
        details: {
          name: '',
          number: '',
          cvv: '',
          month: '',
          year: '',
        },
      };
    }
    // case SET_STORED_CARD: {
    //   return {
    //     ...state,
    //     storedCards: [...state.storedCards, action.cardId],
    //   };
    // }
    case SET_ERRORS: {
      return {
        ...state,
        errors: {
          ...state.errors,
          errors: action.errors,
        },
      };
    }
    case GET_STORED_CARDS: {
      return {
        ...state,
        storedCards: action.payload,
      };
    }
    default:
      return state;
  }
};
