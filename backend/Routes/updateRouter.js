import express from "express";
import { dogs } from "../models/dogSchema.js";

const updateRouter = express.Router();

// Update checked in status
updateRouter.put("/checkin", async (req, res) => {
  try {
    const id = req.body.dogId;
    const thisDog = await dogs.findById(id);

    thisDog.checkedIn = !thisDog.checkedIn;
    await thisDog.save();

    res.status(200).json({ dogId: thisDog });
  } catch (err) {
    console.log("Something went wrong:", err);
  }
});

updateRouter.put("/doginfo", async (req, res) => {
  try {
    const { id, updatedInfo } = req.body;
    const { changedName, changedAge, changedBio } = updatedInfo;

    const thisDog = await dogs.findById(id);
    const newDogInfo = await thisDog.updateOne({
      name: changedName,
      age: changedAge,
      bio: changedBio,
    });

    res.status(200).json({ newDog: newDogInfo });
  } catch (err) {
    console.error("Something went wrong:", err);
    res.status(500).json({ error: err });
  }
});

export default updateRouter;
