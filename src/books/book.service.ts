import { Injectable } from '@nestjs/common';
import { Book } from './book.model';

@Injectable()
export class BookService {
  public books: Book[] = [
    {
      id: '1',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      language: 'English',
      pageCount: 281,
      description:
        'A novel set in the American South during the 1930s, dealing with the issues of racism and injustice.',
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      language: 'English',
      pageCount: 328,
      description:
        'A dystopian novel set in a totalitarian society, where the government exercises complete control over every aspect of life.',
    },
    {
      id: '3',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Fiction',
      language: 'English',
      pageCount: 277,
      description:
        'A story about a disenchanted teenager, Holden Caulfield, navigating the challenges of adolescence and adulthood.',
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Classic',
      language: 'English',
      pageCount: 279,
      description:
        'A classic novel exploring the themes of love, class, and society in 19th-century England.',
    },
    {
      id: '5',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      language: 'English',
      pageCount: 180,
      description:
        'A story of decadence, idealism, and excess set against the backdrop of the Roaring Twenties in America.',
    },
    {
      id: '6',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Dystopian',
      language: 'English',
      pageCount: 268,
      description:
        'A dystopian novel depicting a futuristic society characterized by extreme technological advancement and individualism.',
    },
    {
      id: '7',
      title: 'Moby-Dick',
      author: 'Herman Melville',
      genre: 'Adventure',
      language: 'English',
      pageCount: 720,
      description:
        'An epic tale of obsession and revenge as Captain Ahab pursues the white whale, Moby-Dick, across the seas.',
    },
    {
      id: '8',
      title: 'The Odyssey',
      author: 'Homer',
      genre: 'Epic',
      language: 'Ancient Greek',
      pageCount: 384,
      description:
        'An ancient Greek epic poem attributed to Homer, chronicling the adventures of Odysseus during his journey home after the Trojan War.',
    },
    {
      id: '9',
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      language: 'English',
      pageCount: 1178,
      description:
        'A high fantasy trilogy set in the fictional world of Middle-earth, following the quest to destroy a powerful ring.',
    },
    {
      id: '10',
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      genre: 'Psychological Thriller',
      language: 'Russian',
      pageCount: 671,
      description:
        'A novel exploring the moral and psychological dilemmas of a young ex-student, Raskolnikov, who commits a heinous crime.',
    },
    {
      id: '11',
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      genre: 'Historical Fiction',
      language: 'Russian',
      pageCount: 1444,
      description:
        'An epic novel set against the backdrop of the Napoleonic Wars, exploring themes of love, war, and destiny.',
    },
    {
      id: '12',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Philosophical Fiction',
      language: 'Portuguese',
      pageCount: 197,
      description:
        'A philosophical novel following the journey of a young shepherd named Santiago as he seeks his personal legend.',
    },
    {
      id: '13',
      title: 'One Hundred Years of Solitude',
      author: 'Gabriel García Márquez',
      genre: 'Magic Realism',
      language: 'Spanish',
      pageCount: 448,
      description:
        'A landmark novel in the magic realism genre, chronicling the Buendía family over several generations in the fictional town of Macondo.',
    },
    {
      id: '14',
      title: 'The Road',
      author: 'Cormac McCarthy',
      genre: 'Post-Apocalyptic',
      language: 'English',
      pageCount: 287,
      description:
        'A post-apocalyptic novel following the journey of a father and his young son as they navigate a desolate world.',
    },
    {
      id: '15',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      language: 'English',
      pageCount: 310,
      description: 'A fantasy novel following the adventures',
    },
  ];

  private authorsSet = new Set<string>();
  private genresSet = new Set<string>();
  private languagesSet = new Set<string>();

  constructor() {
    this.books.forEach((book) => {
      this.authorsSet.add(book.author);
      this.genresSet.add(book.genre);
      this.languagesSet.add(book.language);
    });
  }

  getBooks(): Book[] {
    return this.books;
  }

  public authors: string[] = [...this.getUniqueValues('author')];
  public genres: string[] = this.getUniqueValues('genre');
  public languages: string[] = this.getUniqueValues('language');

  public getUniqueValues(property: keyof Book): string[] {
    const uniqueValues = new Set<string>();
    this.books.forEach((book) => {
      const value = book[property];
      if (value) {
        if (typeof value === 'string') {
          uniqueValues.add(value);
        }
      }
    });
    return Array.from(uniqueValues);
  }

  getAuthors(): string[] {
    return Array.from(this.authorsSet);
  }

  getGenres(): string[] {
    return Array.from(this.genresSet);
  }

  getLanguages(): string[] {
    return Array.from(this.languagesSet);
  }

  getBookById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  updateBook(id: string, updatedBook: Book): Book {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books[index] = { ...this.books[index], ...updatedBook };
      this.authors = this.getUniqueValues('author');
      this.genres = this.getUniqueValues('genre');
      this.languages = this.getUniqueValues('language');
      return this.books[index];
    }
  }

  addBook(newBook: Book): void {
    this.books.push(newBook);
    this.authors = this.getUniqueValues('author');
    this.genres = this.getUniqueValues('genre');
    this.languages = this.getUniqueValues('language');
  }

  updateAuthors(authors: string[]): void {
    this.books.forEach((book, index) => {
      if (!book.id || authors.includes(book.author)) {
        return;
      }

      const updatedBook = { ...book, author: 'Unknown' };
      this.updateBook(book.id, updatedBook);
    });
  }

  addAuthor(newAuthor: string): void {
    console.log(this.authors);
    console.log(newAuthor);
    this.authors.push(newAuthor);
    this.authors = this.getUniqueValues('author');
    this.updateAuthors(this.authors);
    this.languages = this.getUniqueValues('language');
    this.genres = this.getUniqueValues('genre');
  }
}
