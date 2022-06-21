import React from "react";

function EpisodeItem(props) {
  var { episode } = props;
  return (
    <div className="col mb-3">
      <div className="card" style={{ width: "15rem" }}>
        <img src={episode.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{episode.name}</h5>
          <p className="card-text">Price: {episode.price}$</p>
          <button type="button" className="btn btn-primary">
            Edit episode
          </button>
        </div>
      </div>
    </div>
  );
}

export default EpisodeItem;
