import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { NgxDropzoneModule } from 'ngx-dropzone';

// Modules
import { MaterialModule } from './material.module';

// Components, Directives, Pipes, Services
import { BookFormComponent } from '../components/book-form/book-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        BookFormComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: BookFormComponent}]),
        MaterialModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        NgxDropzoneModule
    ],
    exports: [
        RouterModule
    ]
})

export class BookFormModule {}