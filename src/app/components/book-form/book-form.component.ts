import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Book, BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})

export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  pageName!: string;
  selectedBook!: Book | undefined;
  selectedBookID!: string;
  files: File[] = [];

  constructor(
    // @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'author': new FormControl(null, Validators.required),
      'category': new FormControl('Programming'),
      'price': new FormControl(null, Validators.required),
      'version': new FormControl(null, Validators.required),
      'ISBN': new FormControl(null, Validators.required),
      'releaseDate': new FormControl(null),
      'brief': new FormControl(null, Validators.required),
    });
    this.route.params.subscribe(params => {
      if( params['id'] !== 'add' ) {
        this.pageName = 'Edit Book';
        this.selectedBook = this.booksService.getBook(params['id']);
        this.selectedBookID = params['id'];
        if( this.selectedBook ) {
          this.bookForm.patchValue({
            'title': this.selectedBook.title,
            'author': this.selectedBook.author,
            'category': this.selectedBook.category,
            'price': this.selectedBook?.price,
            'version': this.selectedBook?.version,
            'ISBN': this.selectedBook?.ISBN,
            'releaseDate': this.selectedBook?.releaseDate,
            'brief': this.selectedBook?.brief
          });
        }
      } else {
        this.pageName = 'Add Book';
        this.selectedBook = undefined;
      }
      
    })
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  
  uploadImageHandler(event: Event) {
    const file = ((<HTMLInputElement>event.target).files as FileList)[0];
    const filePath = `roomImage/${file.name}`;
    // const fileRef = this.fireStorage.ref(filePath);
    // this.fireStorage.upload(filePath, file).snapshotChanges().subscribe(uploadRes => {
    //   console.log(uploadRes);
    //   fileRef.getDownloadURL().subscribe(url => {
    //     console.log(url);
    //   });
    // });
  }

  submitHandler() {
    if( !this.selectedBook ) {
      this.booksService.createBook({id: crypto.randomUUID(), ...this.bookForm.value});
    } else {
      this.booksService.editBook({id: this.selectedBookID, ...this.bookForm.value});
    }
    // if( this.status === 'add' ) this.booksService.createBook(this.bookForm.value);

    // Edit for later
    // else this.booksService.editBook(this.id);
    this.router.navigate(['/books']);
  }

  cancelHandler() {
    this.router.navigate(['/books']);
  }

}
