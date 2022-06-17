import { Body, Controller, Get, HttpCode, HttpStatus, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginAuthDto } from './dto';

@Controller('auth')
// auth/signup
// signup(@Req() req: Request) => import {Request} from 'express';
// dto folder is validation folder
//   signup(@Body('name') name: string, @Body('email') email: string, @Body('password', ParseIntPipe) password: string,){

export class AuthController{
  constructor(private authService: AuthService) {
  }


  @Post('signup')
  signup(@Body() dto: AuthDto){
   // console.log(dto)
    return this.authService.signUp(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: LoginAuthDto){
    return this.authService.login(dto)
  }

  @Post('fileupload')
  fileupload(){
    return this.authService.imageUpload()
  }

  @Get('getuser')
  getuser(){
    return this.authService.getUser()
  }
}