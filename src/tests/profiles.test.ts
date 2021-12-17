process.env["NODE_CONFIG_DIR"] = "../configs";
process.env["NODE_ENV"] = "test";

import axios from "axios";
import { Profile } from "@interfaces/profile.interface";
import "dotenv/config";

const BASE_URL = "http://localhost:" + (process.env.PORT || 9000);

let createdProfileData: Profile;
describe("Test Profiles", () => {
  it("[POST] /api/profiles to create a profile and it should return 201 and location header", async () => {
    const { status, headers, data } = await axios.post(
     BASE_URL + "/api/profiles",
      {
        name: "Saman Baboli",
        nickname: "Sam",
        email: "samanbaboli@gmail.com",
        capital: 214,
        divisa: "!!!",
        preferedCryptoCurrency: "TOMO",
      }
    );
    createdProfileData = data.data;
    expect(status).toBe(201);
    expect(headers).toHaveProperty("location");
  });

  it("[POST] /api/profiles to create a profile and it should return 400 because we don't send a obligatory field", async () => {
    try {
      await axios.post(BASE_URL + "/api/profiles", {
        nickname: "Sam",
        email: "samanbaboli@gmail.com",
        capital: 214,
        divisa: "!!!",
        preferedCryptoCurrency: "TOMO",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  it("[PUT] /api/profiles to update a profile and it should return 200", async () => {
    const { status } = await axios.put(
     BASE_URL + "/api/profiles/" + createdProfileData._id,
      {
        name: "Saman Baboli",
        nickname: "Sam",
        email: "samanbaboli@gmail.com",
        capital: 214,
        divisa: "!!!",
        preferedCryptoCurrency: "BTC",
      }
    );
    expect(status).toBe(200);
  });

  it("[GET] /api/profiles/:id to get a profile and it should return 200", async () => {
    const { status } = await axios.get(
     BASE_URL + "/api/profiles/" + createdProfileData._id
    );
    expect(status).toBe(200);
  });

  it("[GET] /api/profiles/ to get all profiles and it should return 200 and an array", async () => {
    const { status } = await axios.get(
     BASE_URL + "/api/profiles/"
    );
    expect(status).toBe(200);
  });

  it("[GET] /api/profiles/61bc683e63436203960ccc61 to get a 404 error", async () => {
    try {
      await axios.get(
       BASE_URL + "/api/profiles/61bc683e63436203960ccc61"
      );
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  it("[DELETE] /api/profiles/:id to delete a profile and it should return 204", async () => {
    const { status, headers } = await axios.delete(
     BASE_URL + "/api/profiles/" + createdProfileData._id
    );
    expect(status).toBe(204);
  });
});
