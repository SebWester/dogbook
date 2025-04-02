import express from "express";
import { dogs } from "../models/dogSchema.js";

const createRouter = express.Router();

createRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { name, age, bio } = req.body;
    console.log("name:", name, "age:", age, "bio:", bio);

    const newDog = new dogs({
      name: name,
      age: age,
      bio: bio,
      checkedIn: false,
      friends: [],
    });

    await newDog.save();

    res
      .status(200)
      .json({ status: "Ok", savedName: name, savedAge: age, savedBio: bio });
  } catch (err) {
    console.error("Could not post:", err);
  }
});

export default createRouter;
