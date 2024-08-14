import React from 'react';
import './Morepage.css';
import { useNavigate } from 'react-router-dom';

function Customise() {
  const navigate = useNavigate();

  return (
    <div className="customize">
      <div className="custombtn">
        <button
          className="CartBtn"
          onClick={() => {
            navigate('/personalised-prosperity');
          }}
        >
          <span className="IconContainer">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </span>
          <p className="text3">Customise Now</p>
        </button>
      </div>
    </div>
  );
}

export default Customise;