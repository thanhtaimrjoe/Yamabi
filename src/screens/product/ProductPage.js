import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ProductPage(props) {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    // eslint-disable-next-line
  }, []);

  return <h1>Welcome to ProductPage</h1>;
}

export default ProductPage;
