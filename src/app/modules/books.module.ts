import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


// Modules
import { MaterialModule } from './material.module';

// Components, Directives, Pipes, Services
import { BooksComponent } from '../components/books/books.component';
import { PopupComponent } from '../components/books/popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardDeleteComponent } from '../components/books/popup/card-delete/card-delete.component';

@NgModule({
    declarations: [
        BooksComponent, 
        PopupComponent,
        CardDeleteComponent, 
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: BooksComponent }]),
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ]
})

export class BooksModule {}