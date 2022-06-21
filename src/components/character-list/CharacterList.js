import React from "react";

function CharacterList(props) {
  return (
    <div className="container mb-4">
      <p className="h4 mb-3">Character list</p>
      <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {props.children}
      </div>
    </div>
  );
}

export default CharacterList;
