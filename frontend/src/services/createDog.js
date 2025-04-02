const API_URL = "http://localhost:3000/";

// Create and save new dog
async function createNewDog(dogData) {
  const resp = await fetch(API_URL + "create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dogData),
  });

  const data = await resp.json();
  return data.savedDog;
}

// Upload profile picture
async function picUpload(dogId, img) {
  const formData = new FormData();
  formData.append("profileImage", img);

  try {
    const resp = await fetch(API_URL + "upload", {
      method: "POST",
      body: formData,
    });

    const data = await resp.json();
    console.log("Upload successful:", data);
  } catch (err) {
    console.error("Error uploading image:", err);
  }
}

export { createNewDog, picUpload };
