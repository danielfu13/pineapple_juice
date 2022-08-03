import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-primary pt-3 pb-2">
      <div className="container text-left m-0">
        {location.pathname !== '/' && (
          <button
            className="btn bg-newheader btn-right mr-2 text-light "
            onClick={() => navigate(-1)}
          >
             Back
          </button>
        )}
        <h6>
          Exercise-Tracker
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
