import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {

    constructor(private prisma: PrismaService){

    }

    getBookmarks(id:number){
        return this.prisma.bookmark.findMany({
            where:{
                id
            }
        })
    }


    getBookmarksById(id:number, bookmarkid:number){
     /*    console.log({
            id: id,
            bookmarkid: bookmarkid
        }) */
        return this.prisma.bookmark.findFirst({
            where:{
                id: bookmarkid,
                userId: id
            }
        })
    }

 
   async createBookmark(userId:number, dto: CreateBookmarkDto){
    const bookmark =
    await this.prisma.bookmark.create({
      data: {
        title: dto.title,
        description: dto.description,
        link: dto.link,
        userId
      },
    });
         return bookmark;
   }

  
  async editBookmarksById(id:number, bookmarkid, dto: EditBookmarkDto){

        // get the bookmark id
        const bookmarkId = await this.prisma.bookmark.findUnique({
            where:{
                id: bookmarkid
            }
        })
        if(!bookmarkId || bookmarkId.id !== id){
            throw new ForbiddenException('Access to resource denied!')
        }
        // check if user own the bookmark
        return this.prisma.bookmark.update({
            where:{
                id: bookmarkid
            },
            data:{
                ...dto
            }
        })

    }

   async deleteBookmarksById(id:number, bookmarkid:number){
       // get the bookmark id
       const bookmarkId = await this.prisma.bookmark.findUnique({
        where:{
            id: bookmarkid
        }
        })
        if(!bookmarkId || bookmarkId.id !== id){
            throw new ForbiddenException('Access to resource denied!')
        }

       let deleteData =  await this.prisma.bookmark.delete({
            where:{
                id: bookmarkid
            }
        })

        return deleteData;
    }

}
