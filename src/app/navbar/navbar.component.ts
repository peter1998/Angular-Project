import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  toggleNavbar = true;
  
  constructor(private useService: UserService,
             private authService: AuthService) { }

    isLoggedIn$: Observable<boolean>;
    user$: Observable<User>;
    
    ngOnInit(): void {
      this.isLoggedIn$ = this.authService.isLoggedIn();
      this.user$ = this.authService.user;

      
    }

    logout(){
      this.authService.logout()
      .catch(err=> {
        console.log("Something went wrong", err.message);
      })
    }
  
}
