const API_URL = "http://localhost:3000/delete-dog";

async function deleteDog(id) {
  const resp = await fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  });

  const data = await resp.json();
  window.location.reload();
  return data;
}

export default deleteDog;
