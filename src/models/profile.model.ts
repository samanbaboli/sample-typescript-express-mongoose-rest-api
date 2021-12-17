import { model, Schema, Document } from "mongoose";
import { Profile } from "@interfaces/profile.interface";

const profileSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  capital: {
    type: Number,
    required: false,
  },
  divisa: {
    type: String,
    required: false,
  },
  preferedCryptoCurrency: {
    type: String,
    required: false,
  },
});

const profileModel = model<Profile & Document>("Profile", profileSchema);

export default profileModel;
