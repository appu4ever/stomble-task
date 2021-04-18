import React from 'react';
import Input from '../Input/Input';
import './card.css';

export default function Card({
  cardNumber,
  cardName,
  cardCVV,
  month = 'MM',
  year = 'YY',
  isFlipped,
}) {
  console.log(cardNumber);
  return (
    <div className="card card-container">
      <div
        className={`${
          isFlipped ? 'front-side-flip' : ''
        } card front-side column`}
      >
        <div className="card-details">
          <div id="hologram"></div>
          <div id="card-company">DISCOVER</div>
        </div>
        <div className="card-details column">
          <Input value={cardNumber} readOnly />
          <div
            className="card-details"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <Input value={cardName} readOnly divStyle={{ width: '70%' }}>
              Card Holder
            </Input>
            <Input
              value={`${month}/${year}`}
              placeholder="MM/YY"
              readOnly
              divStyle={{ width: '30%' }}
            >
              Expires
            </Input>
          </div>
        </div>
      </div>
      <div
        className={`${isFlipped ? 'back-side-flip' : ''} card back-side column`}
      >
        <div className="black-strip"></div>
        <Input
          value={cardCVV}
          readOnly
          id="card-cvv"
          divStyle={{ margin: '5px 10px' }}
        >
          CVV
        </Input>
        <div id="card-company">DISCOVER</div>
      </div>
    </div>
  );
}
