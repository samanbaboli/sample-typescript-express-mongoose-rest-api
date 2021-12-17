import { model, Schema, Document } from "mongoose";
import { Favorite } from "@interfaces/favorite.interface";

const favoriteSchema: Schema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  name: {
    type: String,
    required: true,
  },
  favorites: {
    type: Array,
    defualt: [],
  },
});

const favoriteModel = model<Favorite & Document>("Favorite", favoriteSchema);

export default favoriteModel;
