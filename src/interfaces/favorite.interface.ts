import { ObjectId } from "mongoose";
export interface Favorite {
  _id: ObjectId;
  profileId: ObjectId;
  name: string;
  favorites?: string[];
}
