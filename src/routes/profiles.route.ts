import { Router } from "express";
import ProfilesController from "@controllers/profiles.controller";
import { CreateProfileDto } from "@dtos/profiles.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class FavoritesRoute implements Routes {
  public path = "/profiles";
  public router = Router();
  public profilesController = new ProfilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.profilesController.find);
    this.router.get(`${this.path}/:id`, this.profilesController.findOne);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateProfileDto, "body"),
      this.profilesController.create
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateProfileDto, "body", true),
      this.profilesController.update
    );
    this.router.delete(`${this.path}/:id`, this.profilesController.delete);
  }
}

export default FavoritesRoute;
