import express from "express";
import { dogs } from "../models/dogSchema.js";

const addFriendRouter = express.Router();

addFriendRouter.get("/friendlist", async (req, res) => {
  const friendId = req.query.id;
  const thisDog = await dogs.findById(friendId);
  res.status(200).json({ dog: thisDog });
});

addFriendRouter.put("/", async (req, res) => {
  try {
    const thisDogId = req.body.thisDog;
    const friendDogId = req.body.friendDog;

    const thisDog = await dogs.findById({ _id: thisDogId });
    const friendDog = await dogs.findById(friendDogId);

    // console.log(thisDog);
    // console.log(friendDog);

    if (!thisDog.friends.includes(friendDogId)) {
      thisDog.friends.push(friendDog);

      await thisDog.save();
    }

    res.status(200).json({ newFriend: friendDog });
  } catch (err) {
    console.error("Could not add friend:", err);
    res.status(500).json({ error: err });
  }
});

export default addFriendRouter;
