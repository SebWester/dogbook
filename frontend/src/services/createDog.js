const API_URL = "http://localhost:3000/create";

async function createNewDog(dogData) {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dogData),
  });

  const data = await resp.json();
  console.log(dogData);
}

export default createNewDog;
