import express from "express";
import { dogs } from "../models/dogSchema.js";

const addFriendRouter = express.Router();

addFriendRouter.post("/", async (req, res) => {
  console.log(req.body);
  const thisDogId = req.body.thisDog;
  const friendDogId = req.body.friendDog;

  //   console.log(thisDogId);
  //   console.log(friendDogId);

  const thisDog = await dogs.findById({ _id: thisDogId });
  const friendDog = await dogs.findById(friendDogId);

  console.log(thisDog);
  console.log(friendDog);

  res.status(200).json({ body: req.body });
});

export default addFriendRouter;
