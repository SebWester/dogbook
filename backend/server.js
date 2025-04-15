import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoDB from "./database.js";

const app = express();
const PORT = 3000;

mongoDB();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.static("uploads"));
app.use(helmet());

// Routes
import createRouter from "./Routes/createRouter.js";
import fetchRouter from "./Routes/fetchRouter.js";
import updateRouter from "./Routes/updateRouter.js";
import uploadRouter from "./Routes/uploadRouter.js";
import deleteRouter from "./Routes/deleteRoute.js";
import addFriendRouter from "./Routes/addFriendRouter.js";
import friendRouter from "./Routes/getFriendsRouter.js";

app.use("/create", createRouter);
app.use("/dogdata", fetchRouter);
app.use("/update", updateRouter);
app.use("/upload", uploadRouter);
app.use("/delete-dog", deleteRouter);
app.use("/add-friend", addFriendRouter);
app.use("/dogs", friendRouter);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}🚀`);
});

export { app, server };
