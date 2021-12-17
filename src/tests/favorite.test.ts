import { Favorite } from "@interfaces/favorite.interface";
import axios from "axios";
import "dotenv/config";

const BASE_URL = "http://localhost:" + (process.env.PORT || 9000);
let createdFavoriteData: Favorite;
describe("Test Favorites", () => {
  it("[POST] /api/favorites to create a favorite and it should return 201 and location header", async () => {
    const { status, headers, data } = await axios.post(
      BASE_URL + "/api/favorites",
      {
        profileId: "55ae24016fb73f6ac7c2d640",
        name: "Saman",
        favorites: ["TOMO", "ETH"],
      }
    );
    createdFavoriteData = data.data;
    expect(status).toBe(201);
    expect(headers).toHaveProperty("location");
  });

  it("[POST] /api/favorites to create a favorite and it should return 400 because we don't send a obligatory field", async () => {
    try {
      await axios.post(BASE_URL + "/api/favorites", {
        profileId: "55ae24016fb73f6ac7c2d640",
        name: "Saman",
        favorites: ["TOMO", "ETH"],
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  it("[PUT] /api/favorites to update a favorite and it should return 200", async () => {
    const { status } = await axios.put(
      BASE_URL + "/api/favorites/" + createdFavoriteData._id,
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

  it("[GET] /api/favorites/:id to get a favorite and it should return 200", async () => {
    const { status } = await axios.get(
      BASE_URL + "/api/favorites/" + createdFavoriteData._id
    );
    expect(status).toBe(200);
  });

  it("[GET] /api/favorites/ to get all favorites and it should return 200 and an array", async () => {
    const { status } = await axios.get(BASE_URL + "/api/favorites/");
    expect(status).toBe(200);
  });

  it("[GET] /api/favorites/61bc683e63436203960ccc61 to get a 404 error", async () => {
    try {
      await axios.get(BASE_URL + "/api/favorites/61bc683e63436203960ccc61");
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  it("[DELETE] /api/favorites/:id to delete a favorite and it should return 204", async () => {
    const { status } = await axios.delete(
      BASE_URL + "/api/favorites/" + createdFavoriteData._id
    );
    expect(status).toBe(204);
  });
});
