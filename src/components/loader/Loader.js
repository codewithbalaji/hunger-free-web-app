import React from "react";
import "../loader/loader.css";
import img from "logo.png";


const Loader = () => {
  return (
    <div className="loader">
      <div className="svg-wrapper">
        <img className="svg" src={img} alt="logo" />
      </div>
      <div className="loading-text">Code Commandos</div>
    </div>
  );
};

export default Loader;