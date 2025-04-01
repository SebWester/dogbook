// Update checked in status
async function updateCheckIn(id) {
  const resp = await fetch("http://localhost:3000/update/checkin", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dogId: id }),
  });

  const data = await resp.json();
  console.log(data);
}

export { updateCheckIn };
