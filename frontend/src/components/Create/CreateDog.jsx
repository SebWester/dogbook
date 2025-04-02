import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createNewDog, picUpload } from "../../services/createDog";
import "./Create.css";

function CreateDog() {
  const [newDog, setNewDog] = useState({ name: "", age: "", bio: "" });
  const [profilePic, setProfilePic] = useState(null);

  // Fix layout
  // Fix function for uploading profile pic

  // add submit handler
  function handleSubmit(e) {
    e.preventDefault();
    createNewDog(newDog);
    picUpload(profilePic);
  }

  function handleInput(e) {
    const { id, value } = e.target;
    setNewDog((prevInfo) => ({ ...prevInfo, [id]: value }));
  }

  return (
    <div className="new-dog">
      <h2>Create new dog</h2>
      <form action="" className="create-form" onSubmit={handleSubmit}>
        <label htmlFor="profile-pic">Upload profile picture</label>
        <input
          type="file"
          id="profile-pic"
          onChange={(e) =>
            setProfilePic((prevPic) => (prevPic = e.target.files[0]))
          }
        />

        {/* <div> */}
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" onChange={handleInput} />
        {/* </div> */}

        {/* <div> */}
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          max={20}
          min={0}
          step={1}
          onChange={handleInput}
        />
        {/* </div> */}

        {/* <div> */}
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" onChange={handleInput}></textarea>
        {/* </div> */}

        <input type="submit" value="Save" id="submit-button" />
      </form>

      <Link to={"/"}>To dashboard</Link>
    </div>
  );
}

export default CreateDog;
