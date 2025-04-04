import React from "react";
import { useLocation, Link } from "react-router-dom";
import fetchDogs from "../../services/fetchDogs";

function Profile() {
  const location = useLocation();
  const dog = location.state;
  const friends = dog.friends;

  let imgPath = "/default-img.webp";

  if (dog.profilePic) {
    const profileImage = dog.profilePic;
    imgPath = profileImage.replace(/^uploads/, "");
  }

  function renderFriends(d) {
    return <li>{d.friends}</li>;
  }

  return (
    <div>
      <img
        src={`http://localhost:3000${imgPath}`}
        alt="Profile picture"
        className="profile-pic"
      />

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

      <div className="redirects">
        <Link to={"/"}>To dashboard</Link>
        <Link to={`/update/${dog.name}`} state={dog}>
          Update dog info
        </Link>
      </div>
    </div>
  );
}

export default Profile;
