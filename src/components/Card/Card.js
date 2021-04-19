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
          <div style={{ display: 'flex' }}>
            <Input
              value={cardName}
              readOnly
              divStyle={{
                width: '70%',
              }}
              style={{ background: 'transparent', border: 'none' }}
            >
              Card Holder
            </Input>
            <Input
              value={`${month}/${year}`}
              placeholder="MM/YY"
              readOnly
              divStyle={{ width: '30%' }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#d3d3d3',
              }}
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
          divStyle={{ margin: '5px 10px', color: '#fff' }}
        >
          CVV
        </Input>
        <div id="card-company">DISCOVER</div>
      </div>
    </div>
  );
}
