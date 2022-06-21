import React from "react";

function CharacterItem(props) {
  var { character } = props;
  return (
    <div className="col mb-3">
      <div className="card" style={{ width: "15rem" }}>
        <img src={character.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
          <button type="button" className="btn btn-primary">
            Edit character
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterItem;
