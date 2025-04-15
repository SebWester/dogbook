import request from "supertest";
import { app, server } from "../server";
import mongoose, { modelNames } from "mongoose";

describe("GET /dogdata", () => {
  it("Should return list of dogs", async () => {
    const resp = await request(app).get("/dogdata");
    expect(resp.statusCode).toBe(200);
    expect(Array.isArray(resp.body.dogs)).toBe(true);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
});
