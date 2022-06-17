import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginAuthDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
// @Injectable({})
export class AuthService{
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {
  }
 async signUp(dto: AuthDto){
    let name = dto.name;
    let email = dto.email;
    let password = dto.password
    // hashing password
    const hashPassword = await argon2.hash(password);
    try {
          // save the new user in the db
        const saveUser = await this.prisma.user.create({
          data:{
            name: name,
            email: email, 
            password:hashPassword
          },
          select:{
            id:true,
            name:true,
            email:true,
            password:false,
            createdAt:true,
          }
        });
        // delete saveUser.password
        // return the saved user
        // return saveUser;
        return this.signJwtToken(saveUser.id, saveUser.email)
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){
          if(error.code === 'P2002'){
            throw new ForbiddenException('This Email is already taken')
          }
        }
        throw error;
    }
  }

 async login(dto: LoginAuthDto){
    let email = dto.email;
    let password = dto.password

    // find the user by email
    let user = await this.prisma.user.findUnique({
      where:{
        email: email
      }
    });

    // if user does not exist throw exception
    if(!user) throw new ForbiddenException('User not found')

    // compare password
    let passwordMatch = await argon2.verify(user.password, password);
  
    // if password incorrect throw exception
    if(!passwordMatch) throw new ForbiddenException('Invalid Email or Password!')

    // send back user if all valids
    // delete user.password
    return this.signJwtToken(user.id, user.email)
  }

  async signJwtToken(userId: number, email: string): Promise<{access_token: string}>{
    const secretKey = this.config.get('JWT_SECRET');
    const dataPayload = {
      userId,
      email
    }
    const token = await this.jwt.signAsync(dataPayload, {
      expiresIn: '5m',
      secret: secretKey
    });

    return {
      access_token: token
    }
  }

 async imageUpload() {
  
 }


  async getUser(){
    /* let users1 =  [
      {
        id: 1,
        name: 'prafful'
      },
      {
        id: 2,
        name: 'win'
      }
    ] */

    let users = await this.prisma.user.findMany()
    return users
  }


}