import React from "react";
import { useLocation, Link } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const dog = location.state;
  const friends = dog.friends;

  function renderFriends(d) {
    return <li>{d.friends}</li>;
  }

  return (
    <div>
      {/* Add image */}

      <h2>{dog.name}</h2>
      <h3>{dog.age}</h3>
      <p>
        <i>"{dog.bio}"</i>
      </p>
      <h4>Friends</h4>
      <ul>
        {friends.length > 0 ? (
          dog.friends.map(renderFriends)
        ) : (
          <li>No friends to display</li>
        )}
        {dog.friends.map(renderFriends)}
      </ul>
      <Link to={"/"}>To dashboard</Link>
    </div>
  );
}

export default Profile;
