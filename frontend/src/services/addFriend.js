const API_URL = "http://localhost:3000/"; // Fetch all dogs

async function addFriend(id) {
  const resp = await fetch(API_URL + "dogdata");
  const data = await resp.json();

  const allDogs = data.dogs;
  const possibleFriends = allDogs.filter((d) => d._id !== id);

  return possibleFriends;
}

async function friendRequest(thisDogId, friendDogID) {
  console.log("Dog 1:", thisDogId);
  console.log("Dog 2:", friendDogID);

  const resp = await fetch(API_URL + "add-friend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ thisDog: thisDogId, friendDog: friendDogID }),
  });

  const data = await resp.json();
  console.log(data);
}

export { addFriend, friendRequest };
