import { ObjectId } from "mongoose";
export interface Simulator {
  _id: ObjectId;
  profileId: ObjectId;
  dateRecorded: Date;
  cryptoCurrency: String;
  euros?: Number;
  price: Number;
  quantity: Number;
}
