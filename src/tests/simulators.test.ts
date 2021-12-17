process.env["NODE_CONFIG_DIR"] = "../configs";
process.env["NODE_ENV"] = "test";

import axios from "axios";

import { Simulator } from "@interfaces/simulator.interface";
import mongoose from "mongoose";
import "dotenv/config";

// dotenv.config({ path: './env' });

const BASE_URL = "http://localhost:" + (process.env.PORT || 9000);

let createdSimulatorData: Simulator;
describe("Test Simulators", () => {
  it("[POST] /api/simulators to create a simulator and it should return 201 and location header", async () => {
    const { status, headers, data } = await axios.post(
      BASE_URL + "/api/simulators",
      {
        profileId: mongoose.Types.ObjectId(),
        dateRecorded: new Date(),
        cryptoCurrency: "BTC",
        euros: 2,
        price: 39000,
        quantity: 1,
      }
    );
    createdSimulatorData = data.data;
    expect(status).toBe(201);
    expect(headers).toHaveProperty("location");
  });

  it("[POST] /api/simulators to create a simulator and it should return 400 because we don't send a obligatory field", async () => {
    try {
      await axios.post(BASE_URL + "/api/simulators", {
        dateRecorded: new Date(),
        cryptoCurrency: "BTC",
        euros: 2,
        price: 39000,
        quantity: 1,
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  it("[PUT] /api/simulators to update a simulator and it should return 200", async () => {
    const { status } = await axios.put(
      BASE_URL + "/api/simulators/" + createdSimulatorData._id,
      {
        dateRecorded: new Date(),
        cryptoCurrency: "TOMO",
        euros: 3,
        price: 3498,
        quantity: 2,
      }
    );
    expect(status).toBe(200);
  });

  it("[GET] /api/simulators/:id to get a simulator and it should return 200", async () => {
    const { status } = await axios.get(
      BASE_URL + "/api/simulators/" + createdSimulatorData._id
    );
    expect(status).toBe(200);
  });

  it("[GET] /api/simulators/ to get all simulators and it should return 200 and an array", async () => {
    const { status } = await axios.get(
      BASE_URL + "/api/simulators/"
    );
    expect(status).toBe(200);
  });

  it("[GET] /api/simulators/61bc683e63436203960ccc61 to get a 404 error", async () => {
    try {
      await axios.get(
        BASE_URL + "/api/simulators/61bc683e63436203960ccc61"
      );
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  it("[DELETE] /api/simulators/:id to delete a simulator and it should return 204", async () => {
    const { status } = await axios.delete(
      BASE_URL + "/api/simulators/" + createdSimulatorData._id
    );
    expect(status).toBe(204);
  });
});


