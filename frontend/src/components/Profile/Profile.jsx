import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { updateCheckIn } from "../../services/updateDog.js";
import { friendRequest } from "../../services/addFriend.js";
import { getImagePath } from "./utils/getImagePath";
import useFriendData from "./hooks/useFriendData";
import CheckInToggle from "./components/CheckInToggle";
import FriendList from "./components/FriendList";
import AddFriendList from "./components/AddFriendList";

function Profile() {
  const { state: dog } = useLocation();
  const [isHere, setIsHere] = useState(dog.checkedIn);
  const { otherDogs, friendsDetails, setFriendsDetails } = useFriendData(
    dog._id
  );

  useEffect(() => {
    async function refreshStatus() {
      const resp = await fetch("http://localhost:3000/dogdata");
      const data = await resp.json();
      const currentDog = data.dogs.find((d) => d._id === dog._id);
      setIsHere(currentDog.checkedIn);
    }

    refreshStatus();
  }, [dog._id]);

  const imgPath = getImagePath(dog.profilePic);

  return (
    <div>
      <img
        src={`http://localhost:3000${imgPath}`}
        alt="Profile picture"
        className="profile-pic"
      />
      <h2>{dog.name}</h2>
      <h3>{dog.nickname}</h3>

      <CheckInToggle
        id={dog._id}
        isHere={isHere}
        setIsHere={setIsHere}
        onCheckIn={updateCheckIn}
      />

      <h3>{dog.age}</h3>
      <p>
        <i>"{dog.bio}"</i>
      </p>

      <h4>Friends</h4>
      <ul className="friend-list">
        <FriendList friends={friendsDetails} />
      </ul>

      <h4>Add friend</h4>
      <ul>
        <AddFriendList
          otherDogs={otherDogs}
          friendsDetails={friendsDetails}
          dogId={dog._id}
          onFriendRequest={(from, to) =>
            friendRequest(from, to, setFriendsDetails)
          }
        />
      </ul>

      <div className="redirects">
        <Link to="/">To dashboard</Link>
        <Link to={`/update/${dog.name}`} state={dog}>
          Update dog info
        </Link>
      </div>
    </div>
  );
}

export default Profile;
