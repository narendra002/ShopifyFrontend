import React from "react";
import './Row.css'

const Row = ({ name, email, imageUrl, onDetail }) => {
  const handleDetailClick = () => {
    onDetail();
  };

  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <div className="card-content">
        <h2>{name}</h2>
        <p>{email}</p>
        <button onClick={handleDetailClick} >Detail</button>
      </div>
    </div>
  );
};

export default Row;
