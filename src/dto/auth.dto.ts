import { IsEmail, IsNotEmpty, IsString, Length, IsDateString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @IsDateString()
  birthDate!: string;

  @IsEmail()
  email!: string;

  @Length(6, 128)
  password!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
