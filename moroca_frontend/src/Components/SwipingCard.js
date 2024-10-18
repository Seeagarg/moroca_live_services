// SwipingCard.js
import React from 'react';
import TinderCard from 'react-tinder-card';

function SwipingCard({ data }) {
  return (
    <TinderCard className="swipe" preventSwipe={['up', 'down']}>
      <div className="card">
        {/* Your card content goes here */}
        <img src={data.image} alt={data.name} />
        <h2>{data.name}</h2>
      </div>
    </TinderCard>
  );
}

export default SwipingCard;
