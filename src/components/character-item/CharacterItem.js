import React from "react";

function CharacterItem(props) {
  var { character } = props;
  return (
    <div className="col mb-3">
      <div class="card" style={{ width: "15rem" }}>
        <img src={character.image} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{character.name}</h5>
          <button type="button" class="btn btn-primary">
            Edit character
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterItem;
