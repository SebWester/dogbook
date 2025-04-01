import mongoose from "mongoose";

const allDogs = mongoose.Schema({
  name: String,
  age: Number,
  bio: String,
  checkedIn: Boolean,
  friends: Array,
});

export const dogs = mongoose.model("Dogs", allDogs);
