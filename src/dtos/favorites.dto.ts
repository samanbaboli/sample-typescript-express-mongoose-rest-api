import { IsArray, IsString, IsMongoId, isString } from "class-validator";
import { ObjectId } from "mongoose";
export class CreateFavoriteDto {
  @IsMongoId()
  public profileId: ObjectId;

  @IsString()
  public name: string;

  @IsArray()
  public favorites?: string[];
}
