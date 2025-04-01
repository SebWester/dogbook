import React, { useEffect, useState } from "react";
import ProfileLink from "./Profile/ProfileLinks.jsx";
import CreateButton from "./Create/CreateButton.jsx";
import fetchDogs from "../services/fetchDogs.js";
import "./Home.css";

function Dashboard() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function getDogData() {
      const dogData = await fetchDogs();

      setDogs(dogData);
    }

    getDogData();
  }, []);

  return (
    <div className="home-div">
      <h1>Test</h1>
      {/* Renderar varje hundprofil som en komponent */}
      {dogs.length > 0 ? (
        dogs.map((dog) => <ProfileLink key={dog._id} dog={dog} />)
      ) : (
        <h3>No dogs to show</h3>
      )}
      {/* // {{dogs.map((dog) => (
      //   <ProfileLink key={dog._id} dog={dog} />
      // ))}} */}

      <CreateButton />
    </div>
  );
}

export default Dashboard;
