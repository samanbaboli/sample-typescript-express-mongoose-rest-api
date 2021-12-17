import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";

class FavoritesRoute implements Routes {
  public path = "/ping";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (req, res) => {
      res.status(200).send({ message: "PONG!" });
    });
  }
}

export default FavoritesRoute;
