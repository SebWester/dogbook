const API_URL = "http://localhost:3000/dogdata";

async function fetchDogs() {
  const resp = await fetch(API_URL);
  const data = await resp.json();

  return data.dogs;
}

export default fetchDogs;
