import React, { useState } from "react";
import { Link } from "react-router-dom";
import deleteDog from "../../services/deleteDog.js";
import "./Profile.css";

function ProfileLink({ dog }) {
  const [isHere, setIsHere] = useState(dog.checkedIn);

  let checkedIn = isHere ? "is-here" : "not-here";
  let dogCheckedIn = isHere ? "checked-in" : "not-checked-in";
  return (
    <div className="profile-link" key={dog._id}>
      <Link to={`/profile/${dog.name}`} state={dog} className={`${checkedIn}`}>
        @{dog.name}
      </Link>

      <i className={`fa-regular fa-circle ${dogCheckedIn}`}></i>

      <div className="remove-dog">
        <button onClick={() => deleteDog(dog._id)}>Remove dog</button>
      </div>
    </div>
  );
}

export default ProfileLink;
