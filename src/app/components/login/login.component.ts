import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  isLoginMode = true;
  hidePassword = true;
  auth$!: Observable<any>;

  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      // 'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });
  }
  
  toggleFormStatusHandler() {
    this.isLoginMode = !this.isLoginMode;
    if( this.isLoginMode ) 
      this.signupForm.removeControl('email');
    else 
      this.signupForm.addControl('email', new FormControl(null, [Validators.required, Validators.email]));
  }

  submitHandler() {
    if( this.isLoginMode ) {
      this.auth$ = this.loginService.login(this.signupForm.value);
    }
    else {
      // this.authObservable = this.signService.signup(this.signupForm.value);
    }

    this.isLoginMode && this.auth$.subscribe(
        resData => {
          localStorage.setItem('email', this.loginService.getUserEmail((<FormControl>this.signupForm.get('password')).value));
          localStorage.setItem('username', (<FormControl>this.signupForm.get('username')).value);
          localStorage.setItem('token', resData.token);
          this.loginService.tokenSubject.next(resData.token);
          this.router.navigate(['/books']);
        },
        errData => {
          console.log(errData);
        }
      )
  }
}
