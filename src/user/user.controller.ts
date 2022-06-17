import { Controller, Req, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';

import {Request} from 'express';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    // /user/me
    // getMe(@Req() req: Request ){
    // getMe(@GetUser() user: User, @GetUser('id') id: number){


    constructor(private userService: UserService) {}

    @Get('me')
    getMe(@GetUser() user: User){
        return user
    }

    @Patch()
    editUser(@GetUser('id') id: number, @Body() dto: EditUserDto){
        return this.userService.editUser(id, dto)
    }
}
