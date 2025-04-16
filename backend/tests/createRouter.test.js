import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import createRouter from "../Routes/createRouter";
import { dogs } from "../models/dogSchema.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// För att kunna använda __dirname i ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = express();
  app.use(express.json());
  app.use("/create", createRouter);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await dogs.deleteMany();
});

test("POST /create - should create a new dog with image", async () => {
  const testImagePath = path.join(__dirname, "test-assets", "dog.jpg");
  const response = await request(app)
    .post("/create")
    .field("name", "Bosse")
    .field("nickname", "Bossan")
    .field("age", "3")
    .field("bio", "Gillar att tugga på tofflor")
    .attach("profilePic", testImagePath);

  expect(response.status).toBe(200);
  expect(response.body.savedDog).toHaveProperty("name", "Bosse");
  expect(response.body.savedDog).toHaveProperty("profilePic");
  expect(fs.existsSync(response.body.savedDog.profilePic)).toBe(true);
});
