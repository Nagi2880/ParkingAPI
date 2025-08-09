import { Dnitype } from "@prisma/client";
import { IsDate, IsEmail, IsEnum, isNotEmpty, IsNotEmpty, isString, IsString, Length } from "class-validator";
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
    @IsEnum(Nationalities, {each: true})
    nationality:    Nationality[];

    @IsNotEmpty()
    @IsDate()
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
    @IsDate()
    createdAt:      Date;

    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    dni:            string;

    @IsNotEmpty()
    @IsEnum(Dnitype)
    dniType:        Dnitype;
}
