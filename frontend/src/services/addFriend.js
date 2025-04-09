const API_URL = "http://localhost:3000/"; // Fetch all dogs

async function addFriend(id) {
  const resp = await fetch(API_URL + "dogdata");
  const data = await resp.json();

  const allDogs = data.dogs;
  const possibleFriends = allDogs.filter((d) => d._id !== id);

  return possibleFriends;
}

async function GetDogFriendList(id) {
  const resp = await fetch(`${API_URL}add-friend/friendlist?id=${id}`);
  const data = await resp.json();

  return data;
}

async function friendRequest(thisDogId, friendDogID, setFriendDetails) {
  const resp = await fetch(API_URL + "add-friend", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ thisDog: thisDogId, friendDog: friendDogID }),
  });

  const data = await resp.json();
  if (data.newFriend) {
    setFriendDetails((prevState) => [...prevState, data.newFriend]);
  }
}

export { addFriend, friendRequest, GetDogFriendList };
