import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-card-delete',
  templateUrl: './card-delete.component.html',
  styleUrls: ['./card-delete.component.scss']
})
export class CardDeleteComponent implements OnInit {
  @Input() id!: string;
  
  constructor(
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  deleteCardHandler() {
    this.booksService.deleteBook(this.id);
    this.router.navigate(['/books']);
  }
}
