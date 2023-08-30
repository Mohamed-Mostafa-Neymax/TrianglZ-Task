import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Book, BooksService } from 'src/app/services/books.service';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})

export class BooksComponent implements OnInit {
  displayedColumns: string[] = ['bookTitle', 'bookCategory', 'bookAuthor', 'bookISBN', 'bookVersion', 'actions'];

  books: Book[] = [];
  pageName!: string;
  booksLength!: number;
  
  constructor(private booksService: BooksService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.booksService.booksFilterSubject.subscribe(books => this.books = books);
    this.booksService.booksSubject.subscribe(books => {
      const localBooks = localStorage.getItem('books');
      if( localBooks ) {
        const updatedBooks = JSON.parse(localBooks ? localBooks : '');
        this.books = updatedBooks;
        this.booksLength = updatedBooks.length;
      }
      this.booksService.paginateBooks(1, 4);
    });
    this.route.data.subscribe(data => this.pageName = data['pageName'] );
    this.booksService.paginateBooks(1, 4);
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(PopupComponent, {data: {id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  searchHandler(eve: Event) {
    this.booksService.getFilteredBooks((<HTMLInputElement>eve.target).value);
  }

  handlePageEvent(event: any) {
    this.booksService.paginateBooks(event.pageIndex + 1, event.pageSize);
  }

  actionHandler(actionType: string, id: string) {
    if( actionType === 'delete' ) {
      this.openDialog(id);
    } else {
      this.router.navigate([`/${actionType}/${id}`]);
    }
  }
}
