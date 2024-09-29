import React from "react";


const Tabs = ({ showSubscribe, onShowSubscribe, onShowPush }) => {
  return (
    <div className="tabs">
      <div className="tab-item">
        <button
          className={`tab ${showSubscribe ? "active" : ""}`}
          onClick={onShowSubscribe}
        >
          Subscribe
        </button>
      </div>
      <div className="tab-item">
        <button
          className={`tab ${!showSubscribe ? "active" : ""}`}
          onClick={onShowPush}
        >
          Push
        </button>
      </div>
    </div>
  );
};

export default Tabs;
