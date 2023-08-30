import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('drawer', { static: true }) sidebarRef: any;
  showFiller = false;
  token!: string | null;
  email!: string;
  username!: string;
  // pageName!: string | null;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.loginService.tokenSubject.next(localStorage.getItem('token'));
    this.loginService.tokenSubject.subscribe(token => {
      this.token = token;
      this.email = (<string>localStorage.getItem('email'));
      this.username = (<string>localStorage.getItem('username'));
      if ((!this.sidebarRef._opened && token) || (this.sidebarRef._opened && !token)) this.sidebarRef.toggle();
    });
  }

  openSidebarHandler() {
    this.sidebarRef.toggle();
  }

  logoutHandler() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.loginService.tokenSubject.next(null);
    this.router.navigate(['/login']);
    if (this.sidebarRef._opened) this.sidebarRef.toggle();
  }
}
