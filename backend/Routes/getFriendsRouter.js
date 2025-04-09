import express from "express";
import { dogs } from "../models/dogSchema.js";

const friendRouter = express.Router();

// Route för att hämta vänlistan för en specifik hund
friendRouter.get("/:dogId/friends", async (req, res) => {
  try {
    const dogId = req.params.dogId;

    // Hitta hunden med det angivna ID:t
    const dog = await dogs.findById(dogId).populate("friends"); // Populate används för att hämta fullständiga data för vännerna

    if (!dog) {
      return res.status(404).json({ message: "Dog not found" });
    }

    res.json({ friends: dog.friends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default friendRouter;
