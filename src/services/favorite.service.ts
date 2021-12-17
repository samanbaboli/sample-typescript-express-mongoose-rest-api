import { CreateFavoriteDto } from "@dtos/favorites.dto";
import { HttpException } from "@exceptions/HttpException";
import { Favorite } from "@interfaces/favorite.interface";
import { isEmpty } from "@utils/util";
import favoriteModel from "@/models/favorite.model";

class FavoriteService {
  public favorites = favoriteModel;

  public async findAllFavorite(): Promise<Favorite[]> {
    /**
      If we had authentication, it would be better to return
     only the favorites of a particular profile 
     */
    const favorites: Favorite[] = await this.favorites.find();
    return favorites;
  }

  public async findFavoriteById(favoriteId: string): Promise<Favorite> {
    if (isEmpty(favoriteId))
      throw new HttpException(400, "Please send favoriteId as a argument");

    const findFavorite: Favorite = await this.favorites.findOne({
      _id: favoriteId,
    });
    if (!findFavorite)
      throw new HttpException(
        404,
        "We couldn't find any favorite with given ID"
      );

    return findFavorite;
  }

  public async createFavorite(
    favoriteData: CreateFavoriteDto
  ): Promise<Favorite> {
    if (isEmpty(favoriteData))
      throw new HttpException(400, "Please send all required poperties");

    const createFavoriteData: Favorite = await this.favorites.create(
      favoriteData
    );

    return createFavoriteData;
  }

  public async updateFavorite(
    favoriteId: string,
    favoriteData: CreateFavoriteDto
  ): Promise<Favorite> {
    const updateFavoriteById: Favorite = await this.favorites.findByIdAndUpdate(
      { _id: favoriteId },
      favoriteData,
      { new: true }
    );

    if (!updateFavoriteById)
      throw new HttpException(
        404,
        "We couldn't find any favorite with given ID"
      );

    return updateFavoriteById;
  }

  public async deleteFavorite(favoriteId: string): Promise<Favorite> {
    const deleteFavoriteById: Favorite = await this.favorites.findByIdAndDelete(
      favoriteId
    );
    if (!deleteFavoriteById)
      throw new HttpException(
        404,
        "We couldn't find your favorite with given ID"
      );

    return deleteFavoriteById;
  }
}

export default FavoriteService;
