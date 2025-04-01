import express from "express";
import { dogs } from "../models/dogSchema.js";

const updateRouter = express.Router();

// Update checked in status
updateRouter.put("/checkin", async (req, res) => {
  console.log(req.body);

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

export default updateRouter;
