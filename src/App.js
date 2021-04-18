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

  const cardDetails = useSelector((state) => state.cards.details);
  const storedCards = useSelector((state) => state.cards.storedCards);
  const formErrors = useSelector((state) => state.cards.formErrors);

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
    if (e.target.name === 'number') {
      if (!/^\d+$/.test(cardDetails.number)) {
        dispatch(
          cardActions.setErrors(
            e.target.name,
            'Input should contain only numbers'
          )
        );
        setIsFormValid(false);
        return;
      }

      if (cardDetails.number.length !== 16) {
        dispatch(
          cardActions.setErrors(e.target.name, 'Input should be 16 digits long')
        );
        setIsFormValid(false);
        return;
      }
    }

    if (e.target.name === 'cvv') {
      if (!/^\d+$/.test(cardDetails.cvv)) {
        dispatch(
          cardActions.setErrors(
            e.target.name,
            'Input should contain only numbers'
          )
        );
        setIsFormValid(false);
        return;
      }
      if (cardDetails.cvv.length !== 3) {
        dispatch(
          cardActions.setErrors(e.target.name, 'Input should be 3 digits long')
        );
        setIsFormValid(false);
        return;
      }
    }

    if (e.target.name === 'name') {
      if (!/^[a-zA-z]+([\s][a-zA-Z]+)*$/.test(cardDetails.name)) {
        dispatch(
          cardActions.setErrors(
            e.target.name,
            'Input should contain only alphabets'
          )
        );
        setIsFormValid(false);
        return;
      }
    }
  };

  console.log(storedCards);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(cardActions.setCardDetails(name, value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFlipped(false);
    dispatch(cardActions.resetCardDetails());
    dispatch(cardActions.storeCardInDB('myCards', cardDetails));
  };

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
              onFocus={() => setIsFlipped(true)}
              divStyle={{ width: '50%' }}
            >
              CVV
            </Input>
          </div>
        </Form>
      </div>
      <StoredCardsList storedCards={storedCards} />
    </div>
  );
}

export default App;
