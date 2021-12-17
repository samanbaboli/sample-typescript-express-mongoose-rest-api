import { model, Schema, Document } from "mongoose";
import { Simulator } from "@interfaces/simulator.interface";

const simulatorSchema: Schema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  dateRecorded: {
    type: Date,
    required: true,
  },
  cryptoCurrency: {
    type: String,
    required: true,
  },
  euros: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const simulatorModel = model<Simulator & Document>("Simulator", simulatorSchema);

export default simulatorModel;
