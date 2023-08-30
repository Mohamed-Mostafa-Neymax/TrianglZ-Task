import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface User {
    username: string;
    email: string;
    password: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
    users: User[] = [
        {
            email: "john@gmail.com",
            username: "johnd",
            password: "m38rmF$",
        },
        {
            email: "morrison@gmail.com",
            username: "mor_2314",
            password: "83r5^_",
        },
        {
            email: "kevin@gmail.com",
            username: "kevinryan",
            password: "kev02937@",
        },
        {
            email: "don@gmail.com",
            username: "donero",
            password: "ewedon",
        },
        {
            email: "derek@gmail.com",
            username: "derek",
            password: "jklg*_56",
        },
        {
            email: "david_r@gmail.com",
            username: "david_r",
            password: "3478*#54",
        },
        {
            email: "miriam@gmail.com",
            username: "snyder",
            password: "f238&@*$",
        },
        {
            email: "william@gmail.com",
            username: "hopkins",
            password: "William56$hj",
        },
        {
            email: "kate@gmail.com",
            username: "kate_h",
            password: "kfejk@*_",
        },
        {
            email: "jimmie@gmail.com",
            username: "jimmie_k",
            password: "klein*#%*",
        }
    ];
    
    constructor(private http: HttpClient) { }
    tokenSubject = new BehaviorSubject<string | null>(null);
    emailSubject = new Subject<string>();


    // signup(signupData: User) {
    //     return this.http.post<User>('https://fakestoreapi.com/users', signupData);
    // }

    login(loginData: User) {
        return this.http.post('https://fakestoreapi.com/auth/login', loginData);
    }

    getUserEmail(password: string) {
        const user = this.users.find((user: User) => user.password === password);
        return user ? user.email : '';
    }
}