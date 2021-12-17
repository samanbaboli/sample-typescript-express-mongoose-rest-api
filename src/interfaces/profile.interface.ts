import { ObjectId } from "mongoose";

export interface Profile {
  _id: ObjectId;
  name: string;
  nickname?: string;
  email: string;
  capital?: number;
  divisa?: string;
  preferedCryptoCurrency?: string;
}
