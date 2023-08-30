import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from './material.module';

// Components, Directives, Pipes, Services
import { BookDetailComponent } from '../components/book-detail/book-detail.component';

@NgModule({
    declarations: [
        BookDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: BookDetailComponent}]),
        MaterialModule
    ],
    exports: [
        RouterModule
    ]
})

export class BookDetailModule {}