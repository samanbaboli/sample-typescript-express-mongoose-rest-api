import { Router } from "express";
import FavoritesController from "@controllers/favorites.controller";
import { CreateFavoriteDto } from "@dtos/favorites.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class FavoritesRoute implements Routes {
  public path = "/favorites";
  public router = Router();
  public favoritesController = new FavoritesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.favoritesController.find);
    this.router.get(`${this.path}/:id`, this.favoritesController.findOne);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateFavoriteDto, "body"),
      this.favoritesController.create
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateFavoriteDto, "body", true),
      this.favoritesController.update
    );
    this.router.delete(`${this.path}/:id`, this.favoritesController.delete);
  }
}

export default FavoritesRoute;
