import express from "express";
import { dogs } from "../models/dogSchema.js";

const addFriendRouter = express.Router();

addFriendRouter.put("/", async (req, res) => {
  try {
    console.log(req.body);
    const thisDogId = req.body.thisDog;
    const friendDogId = req.body.friendDog;

    //   console.log(thisDogId);
    //   console.log(friendDogId);

    const thisDog = await dogs.findById({ _id: thisDogId });
    const friendDog = await dogs.findById(friendDogId);

    console.log(thisDog);
    console.log(friendDog);

    if (!thisDog.friends.includes(friendDogId)) {
      thisDog.friends.push({ id: friendDogId, name: friendDog.name });
      await thisDog.save();
    }

    res.status(200).json({ status: "Friend added" });
  } catch (err) {
    console.error("Could not add friend:", err);
    res.status(500).json({ error: err });
  }
});

export default addFriendRouter;
