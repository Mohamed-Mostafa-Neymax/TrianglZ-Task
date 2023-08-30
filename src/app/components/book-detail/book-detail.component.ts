import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Book, BooksService } from 'src/app/services/books.service';
import { PopupComponent } from '../books/popup/popup.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  pageName!: string;
  selectedBook!: Book | undefined;
  months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  formatedDate!: string;
  price!: string | undefined;

  constructor(
    private route: ActivatedRoute, 
    private booksService: BooksService, 
    public dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => this.pageName = data['pageName'] );
    this.route.params.subscribe(params => this.selectedBook = this.booksService.getBook(params['id']));
    const month = this.months[new Date((<string>this.selectedBook?.releaseDate)).getMonth()];
    const day = new Date((<string>this.selectedBook?.releaseDate)).getDate();
    const year = new Date((<string>this.selectedBook?.releaseDate)).getFullYear();
    this.formatedDate = `${month} ${day}, ${year}`;
    this.price = this.selectedBook?.price.toFixed(2);
    console.log(this.selectedBook);
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopupComponent, {data: {id: this.selectedBook?.id}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  editHanlder() {
    this.router.navigate([`/book-form/${this.selectedBook?.id}`]);
  }
}
