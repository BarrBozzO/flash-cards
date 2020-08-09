import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      Main page
      <div>
        <Link to="/sets">Go to sets</Link>
      </div>
    </div>
  );
}

export default Main;
