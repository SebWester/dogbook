import React, { useState } from "react";
import { Link } from "react-router-dom";
import createNewDog from "../../services/createDog";
import "./Create.css";

function CreateDog() {
  const [newDog, setNewDog] = useState({ name: "", age: "", bio: "" });

  // Fix layout
  // Fix function for uploading profile pic

  // add submit handler
  function handleSubmit(e) {
    e.preventDefault();
    createNewDog(newDog);
  }

  function handleInput(e) {
    const { id, value } = e.target;
    setNewDog((prevInfo) => ({ ...prevInfo, [id]: value }));
  }

  return (
    <div className="new-dog">
      <h2>Create new dog</h2>
      <form action="" className="create-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" onChange={handleInput} />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          max={20}
          min={0}
          step={1}
          onChange={handleInput}
        />

        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" onChange={handleInput}></textarea>

        <input type="submit" value="Save" id="submit-button" />
      </form>

      <Link to={"/"}>To dashboard</Link>
    </div>
  );
}

export default CreateDog;
