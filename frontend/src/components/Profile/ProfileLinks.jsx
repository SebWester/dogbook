import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateCheckIn } from "../../services/updateDog.js";
import "./Profile.css";

function ProfileLink({ dog }) {
  const [isHere, setIsHere] = useState(dog.checkedIn);

  function handleCheckIn(id) {
    console.log("Clicked");
    updateCheckIn(id);
  }

  let checkedIn = isHere ? "is-here" : "not-here";
  return (
    <div className="profile-link" key={dog._id}>
      <Link to={`/profile/${dog.name}`} state={dog} className={`${checkedIn}`}>
        {dog.name}
      </Link>

      <label htmlFor={dog._id}>Is here:</label>
      <input
        type="checkbox"
        id={dog._id}
        checked={isHere}
        onChange={() => setIsHere((prevVal) => !prevVal)}
        onClick={() => handleCheckIn(dog._id)}
      />
    </div>
  );
}

export default ProfileLink;
