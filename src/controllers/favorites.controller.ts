import { NextFunction, Request, Response } from "express";
import { Favorite } from "@interfaces/favorite.interface";
import { CreateFavoriteDto } from "@dtos/favorites.dto";
import FavoriteService from "@/services/favorite.service";

class FavoriteController {
  public favoriteService = new FavoriteService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favoriteData: CreateFavoriteDto = req.body;
      const createFavorite: Favorite =
        await this.favoriteService.createFavorite(favoriteData);

      res.set(
        "Location",
        `${process.env.BASE_URL} + /favorites/${createFavorite._id}`
      );
      res.status(201).json({
        data: createFavorite,
        message: "Favorite has been created successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favorites: Favorite[] =
        await this.favoriteService.findAllFavorite();

      res.status(200).json({
        data: favorites,
        message: "All favorites has been retrieved successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favoriteId: string = req.params.id;
      const favorite: Favorite = await this.favoriteService.findFavoriteById(
        favoriteId
      );
      if (!favorite) {
        res.status(404).json({ data: [], message: "No found :(" });
      }
      res.status(200).json({
        data: favorite,
        message: "Your favorite one has been retrieved successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favoriteData: CreateFavoriteDto = req.body;
      const favoriteId: string = req.params.id;

      console.log(favoriteId);
      const updatedFavorite: Favorite =
        await this.favoriteService.updateFavorite(favoriteId, favoriteData);

      if (!updatedFavorite) {
        res.status(404).json({ data: [], message: "No found :(" });
      }
      res.status(200).json({
        data: updatedFavorite,
        message: "Your favorite one has been updated successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favoriteId: string = req.params.id;
      const deletedFavorite: Favorite =
        await this.favoriteService.deleteFavorite(favoriteId);

      if (!deletedFavorite) {
        res.status(404).json({ data: {}, message: "No found :(" });
      }
      res.status(204).json({
        data: {},
        message: "Your favorite one has been deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default FavoriteController;
