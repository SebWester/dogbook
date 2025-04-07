import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { addFriend, friendRequest } from "../../services/addFriend";

function Profile() {
  const [otherDogs, setOtherDogs] = useState([]);
  useEffect(() => {
    async function getOtherDogs() {
      const possibleFriends = await addFriend(dog._id);

      setOtherDogs(possibleFriends);
    }

    getOtherDogs();
  }, []);

  const location = useLocation();
  const dog = location.state;
  const friends = dog.friends;

  // Default image if no profile picture is uploaded
  let imgPath = "/default-img.webp";

  if (dog.profilePic) {
    const profileImage = dog.profilePic;
    imgPath = profileImage.replace(/^uploads/, "");
  }

  // Render dogs friends
  function renderFriends(friend) {
    console.log(friend);
    return (
      <li key={friend.id}>
        <Link to={`/profile/${friend.name}`}>{friend.name}</Link>
      </li>
    );
  }

  // Render dogs to add as friend
  function renderAddFriend(d) {
    // onClick function to add friend
    return (
      <li key={d._id} className="add-friend-div">
        <button onClick={() => friendRequest(dog._id, d._id)}>
          + {d.name}
        </button>
      </li>
    );
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
          <li style={{ fontStyle: "italic" }}>No friends to display</li>
        )}
      </ul>

      {/* Add new friend list */}
      <h4>Add friend</h4>
      <ul>{otherDogs.map(renderAddFriend)}</ul>

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
