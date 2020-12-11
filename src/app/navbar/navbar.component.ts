import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  toggleNavbar = true;
  
  constructor(public useService: UserService) { }

  ngOnInit(): void {
  }

  loginHandler(): void {
    this.useService.login();
  }

  logoutHandler(): void {
    this.useService.login();
  }
}
