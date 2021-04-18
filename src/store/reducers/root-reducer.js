import { combineReducers } from 'redux';
import { cardReducer } from './cards-reducer';

export const rootReducer = combineReducers({
  cards: cardReducer,
});
