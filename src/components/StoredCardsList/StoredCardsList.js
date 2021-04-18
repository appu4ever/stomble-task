import React from 'react';
import Input from '../Input/Input';
import './stored-cards-list.css';

export default function StoredCardList({ storedCards }) {
  console.log(storedCards);
  return (
    <div className="stored-cards-container">
      <h3>Your Cards</h3>
      {storedCards.map((card) => (
        <div key={card.cardNumber} className="stored-card-info-container">
          <input type="radio" value="card" name="cards" />
          <label>
            <table>
              <tbody>
                <tr>
                  <td className="stored-card-info">
                    <span>{card.cardNumber}</span>
                  </td>
                  <td className="stored-card-info">
                    <span>{card.cardOwnerName}</span>
                  </td>
                  <td className="stored-card-info">
                    <span>
                      {card.expirationMonth}/{card.expirationYear}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </label>
        </div>
      ))}
    </div>
  );
}
