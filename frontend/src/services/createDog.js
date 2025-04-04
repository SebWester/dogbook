const API_URL = "http://localhost:3000/";

// Create and save new dog
async function createNewDog(dogData) {
  const resp = await fetch(API_URL + "create", {
    method: "POST",
    body: dogData,
  });

  const data = await resp.json();
  console.log(data);
}

export default createNewDog;
