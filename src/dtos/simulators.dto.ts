import { IsDateString, IsString, IsNumber } from "class-validator";
import { ObjectId } from "mongoose";
export class CreateSimulatorDto {
  @IsString()
  public profileId: ObjectId;
  public cryptoCurrency: string;
  @IsDateString()
  public dateRecorded: Date;
  @IsNumber()
  public euros: number;
  public price: number;
  public quantity: number;
}
