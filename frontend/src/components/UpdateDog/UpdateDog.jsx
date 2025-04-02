import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { updateDogInfo } from "../../services/updateDog.js";
import "./Update.css";

function UpdateDog() {
  const location = useLocation();
  const thisDog = location.state;
  const [newDogInfo, setNewDogInfo] = useState({
    changedName: `${thisDog.name}`,
    changedAge: `${thisDog.age}`,
    changedBio: `${thisDog.bio}`,
  });

  //   On submit handler!
  function submitHandler(e) {
    e.preventDefault();
    updateDogInfo(thisDog._id, newDogInfo);
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setNewDogInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  }

  return (
    <div className="update-dog-info">
      <h1>Update dog info</h1>
      <form action="" onSubmit={submitHandler}>
        {/* Update name */}
        <label htmlFor="changedName">New name: </label>
        <input
          type="text"
          placeholder={`${thisDog.name}`}
          id="changedName"
          onChange={handleChange}
        />

        {/* Update age */}
        <label htmlFor="changedAge">Change age: </label>
        <input
          type="number"
          id="changedAge"
          placeholder={`${thisDog.age}`}
          min={0}
          max={20}
          onChange={handleChange}
        />

        {/* Update bio */}
        <label htmlFor="changedBio">Change bio: </label>
        <textarea
          id="changedBio"
          maxLength="150"
          placeholder={`${thisDog.bio}`}
          onChange={handleChange}
        ></textarea>

        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default UpdateDog;
