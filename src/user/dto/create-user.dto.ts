import { Dnitype } from "@prisma/client";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, Length, } from "class-validator";
import { Type } from "class-transformer";
import nationalitiesJson from '../nationalities.json';

export const Nationalities = nationalitiesJson.nationalities
export type Nationality = typeof Nationalities[number];


export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    email:          string;
    
    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    name:           string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    surname:        string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(Nationalities)
    nationality:    Nationality;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    birthDate:      Date;

    @IsNotEmpty()
    @IsString()
    @Length(7, 15)
    phone:          string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 100)
    password:       string;
    
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    dni:            string;

    @IsNotEmpty()
    @IsEnum(Dnitype)
    dniType:        Dnitype;
}
