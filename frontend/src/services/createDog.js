const API_URL = "http://localhost:3000/";

// Create and save new dog
async function createNewDog(dogData) {
  // console.log(dogData.get("name"));
  // console.log(dogData.get("age"));
  // console.log(dogData.get("bio"));
  // console.log(dogData.get("profilePic"));

  const resp = await fetch(API_URL + "create", {
    method: "POST",
    body: dogData,
  });

  const data = await resp.json();
  console.log(data);
}

export default createNewDog;
