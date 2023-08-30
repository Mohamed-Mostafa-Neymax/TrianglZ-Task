import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    price: number;
    version: string;
    ISBN: string;
    releaseDate?: string;
    brief: string;
}

@Injectable({ providedIn: 'root' })
export class BooksService {
    books: Book[] = [];
    filteredBooks!: Book[];
    paginatedFilteredBooks!: Book[];
    booksSubject = new BehaviorSubject<Book[]>(this.books);
    booksFilterSubject = new BehaviorSubject<Book[]>(this.books);

    updateBooksOnCRUD() {
        localStorage.setItem('books', JSON.stringify(this.books));
        const books = localStorage.getItem('books');
        const updatedBooks = JSON.parse(books ? books : '');
        this.booksSubject.next(updatedBooks);
    }

    createBook(BookData: Book) {
        const books = localStorage.getItem('books');
        if (books) {
            const updatedBooks = JSON.parse(books ? books : '');
            this.books = updatedBooks;
        }
        this.books.unshift(BookData);
        this.updateBooksOnCRUD();
    }

    editBook(newBookData: Book) {
        const books = localStorage.getItem('books');
        if (books) {
            const updatedBooks = JSON.parse(books ? books : '');
            this.books = updatedBooks;
        }

        this.books[this.books.findIndex(book => book.id === newBookData.id)] = newBookData;
        this.updateBooksOnCRUD();
    }

    deleteBook(id: string) {
        const books = localStorage.getItem('books');
        if (books) {
            const updatedBooks = JSON.parse(books ? books : '');
            this.books = updatedBooks;
        }
        this.books.splice(this.books.findIndex(book => book.id === id), 1);
        this.updateBooksOnCRUD();
    }

    getFilteredBooks(textSearch: string) {
        const books = localStorage.getItem('books');
        if (books) {
            const updatedBooks = JSON.parse(books ? books : '');
            this.books = updatedBooks;
        }
        this.filteredBooks = structuredClone(this.books);
        if (textSearch.length > 0) {
            this.filteredBooks = this.filteredBooks.filter(book => 
                book.title.toLowerCase().includes(textSearch.toLowerCase()) ||
                book.author.toLowerCase().includes(textSearch.toLowerCase()) 
                );
            }
            else this.filteredBooks = structuredClone(this.books);
            this.paginatedFilteredBooks = this.filteredBooks.slice((1 - 1) * 4, 1 * 4);
        this.booksFilterSubject.next(this.paginatedFilteredBooks);
    }

    paginateBooks(pageIndex: number, pageSize: number) {
        const books = localStorage.getItem('books');
        if (books) {
            const updatedBooks = JSON.parse(books ? books : '');
            this.books = updatedBooks;
        }
        this.filteredBooks = structuredClone(this.books);
        this.paginatedFilteredBooks = this.filteredBooks.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
        this.booksFilterSubject.next(this.paginatedFilteredBooks);
    }

    getBook(id: string) {
        const books = localStorage.getItem('books');
        if (books) {
            const updatedBooks = JSON.parse(books ? books : '');
            this.books = updatedBooks;
        }
        return this.books.find(book => book.id === id);
    }
}