import React, { useState } from "react";
import { Link } from "react-router-dom";
import createNewDog from "../../services/createDog.js";
import "./Create.css";

function CreateDog() {
  const [newDog, setNewDog] = useState({ name: "", age: "", bio: "" });
  const [profilePic, setProfilePic] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const createdDiv = document.getElementById("created");
    createdDiv.classList.add("show");

    setTimeout(() => {
      createdDiv.classList.remove("show");
    }, 2000);

    const formData = new FormData();
    formData.append("name", newDog.name);
    formData.append("nickname", newDog.nickname);
    formData.append("age", newDog.age);
    formData.append("bio", newDog.bio);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    createNewDog(formData);
  }

  function handleInput(e) {
    const { id, value } = e.target;
    setNewDog((prevInfo) => ({ ...prevInfo, [id]: value }));
  }

  return (
    <div className="new-dog">
      <h2>Create new dog</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label htmlFor="profile-pic">Profile picture:</label>
        <input
          type="file"
          id="profile-pic"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" onChange={handleInput} required />

        <label htmlFor="nickname">Nickname:</label>
        <input type="text" id="nickname" onChange={handleInput} />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          max={20}
          min={0}
          step={1}
          onChange={handleInput}
          required
        />

        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" onChange={handleInput}></textarea>

        <input type="submit" value="Save" id="submit-button" />
      </form>

      {/* Display when dog created */}
      <div id="created">Dog created!</div>

      <Link to={"/"}>To dashboard</Link>
    </div>
  );
}

export default CreateDog;
