const API_URL = "http://localhost:3000/dogdata"; // Fetch all dogs

async function addFriend(id) {
  const resp = await fetch(API_URL);
  const data = await resp.json();

  const allDogs = data.dogs;
  const befriend = allDogs.filter((d) => d._id !== id);

  console.log(befriend);
}

export default addFriend;
