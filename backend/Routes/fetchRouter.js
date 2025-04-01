import express from "express";
import { dogs } from "../models/dogSchema.js";

const fetchRouter = express.Router();

fetchRouter.get("/", async (req, res) => {
  try {
    const allDogs = await dogs.find({});

    // console.log(dogs);
    res.status(200).json({ dogs: allDogs });
  } catch (err) {
    console.error("Could not fetch dog data:", err);
    res.status(500).json({ error: "Could not fetch dog data" });
  }
});

export default fetchRouter;
