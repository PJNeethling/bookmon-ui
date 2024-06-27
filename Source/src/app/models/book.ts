import { BookResponse } from "./book-response";

export class Book {
    constructor(public id: string, public title: string, public author: string,
        public genrename: string, public publicationDate: Date, public publisher: string,
        public pageCount: number, public price: number, public language: string,
        public format: number, public createdDate: Date, public modifiedDate: Date
    ) {}
  
    public static from(bookDto: BookResponse): Book {
      return new Book(bookDto.id, 
        bookDto.title,
        bookDto.author,
        bookDto.genre,
        bookDto.publicationDate,
        bookDto.publisher,
        bookDto.pageCount,
        bookDto.price,
        bookDto.language,
        bookDto.format, 
        bookDto.createdDate, 
        bookDto.modifiedDate);
    }
  }
  