import { useEffect, useState } from "react";
import { addFriend } from "../../../services/addFriend.js";

export default function useFriendData(dogId) {
  const [otherDogs, setOtherDogs] = useState([]);
  const [friendsDetails, setFriendsDetails] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      const res = await fetch(`http://localhost:3000/dogs/${dogId}/friends`);
      const data = await res.json();
      setFriendsDetails(data.friends);
    }

    async function fetchOtherDogs() {
      const possibleFriends = await addFriend(dogId);
      setOtherDogs(possibleFriends);
    }

    fetchFriends();
    fetchOtherDogs();
  }, [dogId]);

  return { otherDogs, friendsDetails, setFriendsDetails };
}
