import { IsNumber, IsString, IsEmail } from "class-validator";
export class CreateProfileDto {
  @IsEmail()
  public email: string;

  @IsNumber()
  public capital?: number;

  @IsString()
  public name: string;
  public nickname: string;
  public divisa: string;
  public preferedCryptoCurrency: string;
}
