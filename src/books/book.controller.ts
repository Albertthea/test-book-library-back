import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.model';
import { v4 as uuidv4 } from 'uuid';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  generateUniqueId(): string {
    return uuidv4();
  }

  @Get()
  getBooks() {
    return this.bookService.getBooks();
  }

  @Get('authors')
  getAuthors() {
    return this.bookService.getAuthors();
  }

  @Get('languages')
  getLanguages() {
    return this.bookService.getLanguages();
  }

  @Get('genres')
  getGenres() {
    return this.bookService.getGenres();
  }

  @Get('unique/:property')
  getUniqueValues(@Param('property') property: keyof Book) {
    return this.bookService.getUniqueValues(property);
  }

  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() updatedBook: Book) {
    return this.bookService.updateBook(id, updatedBook);
  }

  @Put('authors')
  updateAuthors(@Body() authors: string[]) {
    console.log('red');
    return this.bookService.updateAuthors(authors);
  }

  @Post()
  addBook(@Body() book: Book) {
    book.id = this.generateUniqueId();
    this.bookService.addBook(book);
  }

  @Post('authors')
  addAuthor(@Body() newAuthor: string) {
    return this.bookService.addAuthor(newAuthor);
  }
}
