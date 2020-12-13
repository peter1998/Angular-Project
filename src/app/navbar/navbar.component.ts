import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  toggleNavbar = true;
  
  constructor(public useService: UserService,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

    logout(){
      this.authService.logout()
      .catch(err=> {
        console.log("Something went wrong", err.message);
      })
    }
  
}
