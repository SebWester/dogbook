import React from "react";
import { Link } from "react-router-dom";
import "./Create.css";

function CreateButton() {
  return (
    <div className="create-new-button">
      <Link to={"/create"}>Create new dog</Link>
    </div>
  );
}

export default CreateButton;
