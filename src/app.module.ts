import { Module } from '@nestjs/common';
import { BookController } from './books/book.controller';
import { BookService } from './books/book.service';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [BookService],
})
export class AppModule {}
