import mongoose from "mongoose";
import { type } from "os";

const allDogs = mongoose.Schema({
  profilePic: {
    type: String,
    required: false,
  },
  name: String,
  age: Number,
  bio: String,
  checkedIn: Boolean,
  friends: Array,
});

export const dogs = mongoose.model("Dogs", allDogs);
