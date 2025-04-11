const API_URL = "http://localhost:3000/update";

// Update checked in status
async function updateCheckIn(id) {
  const resp = await fetch(API_URL + "/checkin", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dogId: id }),
  });

  const data = await resp.json();
  return data;
}

// Update dogs name, age and bio
async function updateDogInfo(id, newDogInfo) {
  const resp = await fetch(API_URL + "/doginfo/" + id, {
    method: "PUT",
    body: newDogInfo,
  });

  const data = await resp.json();
  return data;
}

export { updateCheckIn, updateDogInfo };
