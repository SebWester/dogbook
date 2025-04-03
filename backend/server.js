import express from "express";
import cors from "cors";
import path from "path";
import mongoDB from "./database.js";

const __dirname = new URL(".", import.meta.url).pathname;

const app = express();
const PORT = 3000;

mongoDB();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.static("uploads"));
// app.use(express.static(path.join(__dirname, "uploads")));
// app.use((req, res, next) => {
//   console.log(`Request URL: ${req.url}`);
//   next();
// });

// Routes
import createRouter from "./Routes/createRouter.js";
import fetchRouter from "./Routes/fetchRouter.js";
import updateRouter from "./Routes/updateRouter.js";
import uploadRouter from "./Routes/uploadRouter.js";

app.use("/create", createRouter);
app.use("/dogdata", fetchRouter);
app.use("/update", updateRouter);
app.use("/upload", uploadRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}🚀`);
});
