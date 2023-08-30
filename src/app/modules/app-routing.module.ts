import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components, Directives, Pipes, Services
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";
import { booksGuard } from "../services/books-guard.service";
import { loginGuard } from "../services/login-guard.service";

const appRoutes: Routes = [
    { path: '', redirectTo: '/books', pathMatch: 'full' },
    { path: 'login', canActivate: [loginGuard], loadChildren: () => import('./login.module').then(module => module.LoginModule) },
    { path: 'books', canActivate: [booksGuard], loadChildren: () => import('./books.module').then(module => module.BooksModule), data: { pageName: 'Books' } },
    { path: 'book-form/:id', loadChildren: () => import('./book-form.module').then(module => module.BookFormModule) },
    { path: 'book-detail/:id', loadChildren: () => import('./book-detail.module').then(module => module.BookDetailModule), data: { pageName: 'Book Details' } },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/page-not-found'}
]

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}