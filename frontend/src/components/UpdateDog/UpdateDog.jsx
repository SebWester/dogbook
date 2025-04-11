import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { updateDogInfo } from "../../services/updateDog.js";
import "./Update.css";

function UpdateDog() {
  const location = useLocation();
  const thisDog = location.state;
  const [newDogInfo, setNewDogInfo] = useState({
    changedName: `${thisDog.name}`,
    changedNick: `${thisDog.nickname}`,
    changedAge: `${thisDog.age}`,
    changedBio: `${thisDog.bio}`,
  });
  const [profilePic, setProfilePic] = useState(null);

  //   On submit handler!
  function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newDogInfo.changedName);
    formData.append("nickname", newDogInfo.changedNick);
    formData.append("age", newDogInfo.changedAge);
    formData.append("bio", newDogInfo.changedBio);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    updateDogInfo(thisDog._id, formData);
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setNewDogInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  }

  // add function for updating profile pic

  return (
    <div className="update-dog-info">
      <h1>Update dog info</h1>
      <form action="" onSubmit={submitHandler}>
        {/* Update profile picture */}
        <label htmlFor="changePic">Change profile picture:</label>
        <input
          type="file"
          id="changePic"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />

        {/* Update name */}
        <label htmlFor="changedName">New name: </label>
        <input
          type="text"
          placeholder={`${newDogInfo.changedName}`}
          value={`${newDogInfo.changedName}`}
          id="changedName"
          onChange={handleChange}
        />
        {/* Update nickname */}
        <label htmlFor="changedNick">New nickname: </label>
        <input
          type="text"
          placeholder={`${newDogInfo.changedNick}`}
          value={`${newDogInfo.changedNick}`}
          id="changedNick"
          onChange={handleChange}
        />

        {/* Update age */}
        <label htmlFor="changedAge">Change age: </label>
        <input
          type="number"
          id="changedAge"
          placeholder={`${newDogInfo.changedAge}`}
          value={`${newDogInfo.changedAge}`}
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
          value={`${newDogInfo.changedBio}`}
          onChange={handleChange}
        ></textarea>

        <input type="submit" value="Save" />
      </form>

      <Link to="/">To dashboard</Link>
    </div>
  );
}

export default UpdateDog;
