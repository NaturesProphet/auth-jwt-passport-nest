import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsDateString, IsEmail, Length, IsPhoneNumber, IsString } from 'class-validator';


export class CreateGenericUserDto {

  @IsString()
  @ApiProperty( {
    example: 'Mateus Garcia'
  } )
  name: string;

  @IsDateString()
  @ApiProperty( {
    example: '1987-03-30T12:00:00.000Z'
  } )
  birthDay: Date;

  @IsEmail()
  @ApiProperty( {
    example: 'mateus.lopes@auim.com.br'
  } )
  email: string;

  @IsNotEmpty()
  @ApiProperty( {
    example: '123456'
  } )
  password: string

  @Length( 11 )
  @ApiProperty( {
    example: '03446269037'
  } )
  cpf: string;

  @IsPhoneNumber( 'BR,US', { each: true } )
  @ApiProperty( {
    example: '+5527988079601',
    description: 'the phone number format must be in BR or US format, without spaces'
  } )
  phone: string;

  @ApiProperty( {
    description: 'use a formdata to send this field'
  } )
  file: Buffer
}
