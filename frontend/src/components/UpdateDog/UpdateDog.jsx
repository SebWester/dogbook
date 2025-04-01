import React from "react";
import { useLocation } from "react-router-dom";
import "./Update.css";

function UpdateDog() {
  const location = useLocation();
  const thisDog = location.state;

  //   On submit handler!

  return (
    <div className="update-dog-info">
      <h1>Update dog info</h1>
      <form action="">
        {/* Update name */}
        <label htmlFor="change-name">New name: </label>
        <input type="text" placeholder={`${thisDog.name}`} id="change-name" />

        {/* Update age */}
        <label htmlFor="change-age">Change age: </label>
        <input type="number" placeholder={`${thisDog.age}`} min={0} max={20} />

        {/* Update bio */}
        <label htmlFor="change-bio">Change bio: </label>
        <textarea
          id="change-bio"
          maxLength="150"
          placeholder={`${thisDog.bio}`}
        ></textarea>

        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default UpdateDog;
