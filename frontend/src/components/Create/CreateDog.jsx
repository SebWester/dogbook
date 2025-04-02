import React from "react";
import { Link } from "react-router-dom";
import "./Create.css";

function CreateDog() {
  // add submit handler

  // Fix layout

  return (
    <div className="new-dog">
      <h2>Create new dog</h2>
      <form action="" className="create-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" max={20} min={0} step={1} />

        <label htmlFor="bio">Bio:</label>
        <textarea id="bio"></textarea>

        <input type="submit" value="Save" id="submit-button" />
      </form>

      <Link to={"/"}>To dashboard</Link>
    </div>
  );
}

export default CreateDog;
