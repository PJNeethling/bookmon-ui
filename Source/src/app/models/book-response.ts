
export interface BookResponse {
    id: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: Date;
    publisher: string;
    pageCount: number;
    price: number;
    language: string;
    format: number;
    createdDate: Date;
    modifiedDate: Date;
}