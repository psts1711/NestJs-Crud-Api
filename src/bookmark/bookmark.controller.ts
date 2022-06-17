import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private bookmarkService: BookmarkService){

    }

    @Get()
    getBookmarks(@GetUser('id') id: number){
        return this.bookmarkService.getBookmarks(id)
    }

    @Get(':id')
    getBookmarksById(@GetUser('id') id: number, @Param('id', ParseIntPipe) bookmarkid: number){
        return this.bookmarkService.getBookmarksById(id, bookmarkid)
    }

    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto){
        return this.bookmarkService.createBookmark(userId, dto)

    }

    @Patch(':id')
    editBookmarksById(@GetUser('id') id: number, @Body() dto: EditBookmarkDto, @Param('id', ParseIntPipe) bookmarkid: number){
        return this.bookmarkService.editBookmarksById(id, bookmarkid, dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarksById(@GetUser('id') id: number, @Param('id', ParseIntPipe) bookmarkid: number){
        return this.bookmarkService.deleteBookmarksById(id, bookmarkid)
    }
}
