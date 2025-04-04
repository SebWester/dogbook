const API_URL = "http://localhost:3000/delete-dog";

async function deleteDog(id) {
  console.log("Clicked:", id);

  //   const resp = await fetch(API_URL, {
  //     method: "DEL",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ id: id }),
  //   });

  //   const data = await resp.json();
  //   console.log(data);
}

export default deleteDog;
