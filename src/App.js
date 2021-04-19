import './App.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from './components/Form/Form';
import Card from './components/Card/Card';
import Input from './components/Input/Input';
import DateSection from './components/ExpirationDate/DateSection';
import Select from './components/ExpirationDate/Select';
import StoredCardsList from './components/StoredCardsList/StoredCardsList';

import { months, years } from './constants';
import { firestore } from './firestore';
import * as cardActions from './store/actions/cards-action';

function App() {
  const dispatch = useDispatch();
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(true);
  const [cardDetails, setCardDetails] = React.useState({
    name: '',
    number: '',
    cvv: '',
    month: '',
    year: '',
  });

  const storedCards = useSelector((state) => state.cards.storedCards);
  const formErrors = useSelector((state) => state.cards.formErrors);
  const errors = useSelector((state) => state.cards.errors);

  React.useEffect(() => {
    const unsubscribe = firestore
      .collection('myCards')
      .onSnapshot((docs) => dispatch(cardActions.getStoredCardsInDB(docs)));

    return () => unsubscribe();
  }, [dispatch]);

  const handleInputDelete = (e) => {
    if (e.keyCode === 8) {
      setIsFormValid(true);
      dispatch(cardActions.resetErrors(e.target.name));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.length === 0) {
      dispatch(
        cardActions.setFormErrors(name, `Please enter a value for card ${name}`)
      );
      setIsFormValid(false);
      return;
    }

    if (name === 'number') {
      if (!/^\d+$/.test(value)) {
        dispatch(
          cardActions.setFormErrors(
            name,
            'Card number should contain only numbers'
          )
        );
        setIsFormValid(false);
        return;
      }

      if (value.length !== 16) {
        dispatch(
          cardActions.setFormErrors(name, 'Card number should be 16 digits')
        );
        setIsFormValid(false);
        return;
      }
    }

    if (name === 'cvv') {
      if (!/^\d+$/.test(value)) {
        dispatch(
          cardActions.setFormErrors(name, 'CVV should contain only numbers')
        );
        setIsFormValid(false);
        return;
      }
      if (value.length !== 3) {
        dispatch(
          cardActions.setFormErrors(name, 'Input should be 3 digits long')
        );
        setIsFormValid(false);
        return;
      }
    }

    if (name === 'name') {
      if (!/^[a-zA-z]+([\s][a-zA-Z]+)*$/.test(value)) {
        dispatch(
          cardActions.setFormErrors(name, 'Input should contain only alphabets')
        );
        setIsFormValid(false);
        return;
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (name === 'cvv') {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
    dispatch(cardActions.resetErrors());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFlipped(false);
    setCardDetails({
      name: '',
      number: '',
      cvv: '',
      month: '',
      year: '',
    });
    dispatch(cardActions.storeCardInDB('myCards', cardDetails));
  };

  const onCardSelect = (card) => {
    const {
      cardOwnerName,
      cardNumber,
      cardCVV,
      expirationMonth,
      expirationYear,
    } = card;
    setCardDetails({
      name: cardOwnerName,
      number: cardNumber,
      cvv: cardCVV,
      month: expirationMonth,
      year: expirationYear,
    });
  };

  console.log(errors);
  return (
    <div className="container">
      <div className="form-card-container">
        <Card
          cardNumber={cardDetails.number}
          cardName={cardDetails.name}
          cardCVV={cardDetails.cvv}
          month={cardDetails.month}
          year={cardDetails.year}
          isFlipped={isFlipped}
        />
        <Form onSubmit={handleSubmit} isFormValid={isFormValid}>
          <Input
            name="number"
            onChange={handleChange}
            value={cardDetails.number}
            errors={formErrors}
            handleBlur={handleBlur}
            handleInputDelete={handleInputDelete}
            onFocus={handleFocus}
          >
            Card Number
          </Input>
          <Input
            name="name"
            onChange={handleChange}
            value={cardDetails.name}
            errors={formErrors}
            handleBlur={handleBlur}
            handleInputDelete={handleInputDelete}
            type="text"
            onFocus={handleFocus}
          >
            Card Name
          </Input>
          <div id="date-cvv-container">
            <DateSection>
              <Select
                value={cardDetails.month}
                name="month"
                defaultText="Month"
                optionArray={months}
                onChange={handleChange}
              />
              <Select
                value={cardDetails.year}
                name="year"
                defaultText="Year"
                optionArray={years}
                onChange={handleChange}
              />
            </DateSection>
            <Input
              name="cvv"
              onChange={handleChange}
              value={cardDetails.cvv}
              errors={formErrors}
              handleBlur={handleBlur}
              handleInputDelete={handleInputDelete}
              onFocus={handleFocus}
              style={{ width: '20%' }}
            >
              CVV
            </Input>
          </div>
        </Form>
      </div>
      <StoredCardsList storedCards={storedCards} onCardSelect={onCardSelect} />
    </div>
  );
}

export default App;
