import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from './material.module';

// Components, Directives, Pipes, Services
import { LoginComponent } from '../components/login/login.component'; 
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [ LoginComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: LoginComponent}
        ]),
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ]
})

export class LoginModule {}