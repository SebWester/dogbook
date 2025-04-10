import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { updateCheckIn } from "../../services/updateDog.js";
import { addFriend, friendRequest } from "../../services/addFriend.js";

function Profile() {
  const [otherDogs, setOtherDogs] = useState([]);
  const [friendsDetails, setFriendsDetails] = useState([]);

  const location = useLocation();
  const dog = location.state;
  const [isHere, setIsHere] = useState(dog.checkedIn);

  useEffect(() => {
    async function dogStatus(id) {
      const resp = await fetch("http://localhost:3000/dogdata");
      const data = await resp.json();

      const thisDog = data.dogs.find((d) => d._id === id);
      setIsHere(thisDog.checkedIn);
    }

    dogStatus(dog._id);
  }, [dog._id]);

  // Default image if no profile picture is uploaded
  let imgPath = "/default-img.webp";
  if (dog.profilePic) {
    const profileImage = dog.profilePic;
    imgPath = profileImage.replace(/^uploads/, "");
  }

  // Get possible friends
  useEffect(() => {
    async function getOtherDogs() {
      const possibleFriends = await addFriend(dog._id);
      setOtherDogs(possibleFriends);
    }
    getOtherDogs();
  }, [dog._id]);

  // Get dogs friend list
  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await fetch(
          `http://localhost:3000/dogs/${dog._id}/friends`
        );
        const data = await response.json();
        setFriendsDetails(data.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    }
    fetchFriends();
  }, [dog._id]);

  // Render dogs to add as friend
  function renderAddFriend(d) {
    const alreadyFriend = friendsDetails.some((friend) => friend._id === d._id);

    if (alreadyFriend) {
      return null;
    }

    return (
      <li key={d._id} className="add-friend-div">
        <button
          onClick={() => friendRequest(dog._id, d._id, setFriendsDetails)}
        >
          + {d.name}
        </button>
      </li>
    );
  }

  function handleCheckIn(id) {
    updateCheckIn(id);
  }

  return (
    <div className="profile-div">
      <img
        src={`http://localhost:3000${imgPath}`}
        alt="Profile picture"
        className="profile-pic"
      />
      <h2>{dog.name}</h2>

      <span className="check-in-dog">
        <label htmlFor={dog._id}>Is here:</label>
        <input
          type="checkbox"
          id={dog._id}
          checked={isHere}
          onChange={() => setIsHere((prevVal) => !prevVal)}
          onClick={() => handleCheckIn(dog._id)}
        />
      </span>

      <h3>{dog.age}</h3>
      <p>
        <i>"{dog.bio}"</i>
      </p>

      {/* RENDER FRIENDS */}
      <h4>Friends</h4>
      <ul className="friend-list">
        {friendsDetails.length > 0 ? (
          friendsDetails.map((friendDog) => (
            <li key={friendDog._id}>
              <Link to={`/profile/${friendDog.name}`} state={friendDog}>
                {friendDog.name}
              </Link>
            </li>
          ))
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
