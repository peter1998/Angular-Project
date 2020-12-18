import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  errorMessage: string;
  successMessage: string;

  user:User

  constructor(private authService: AuthService,
              private router: Router) { 
    this.authService.user.subscribe( u => {
      this.user = u;
  });
  }

  ngOnInit(): void {

    this.email = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [Validators.required]);

    this.loginForm = new FormGroup({
      'email': this.email,
      'password': this.password
    });
  }

  login(): void {
    this.authService.login(this.email.value, this.password.value)
      .then(value => {
        this.loginForm.reset();
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.errorMessage = "Invalid email and or password!";
        console.log('Something went wrong:',err.message);
      });
    }

  logout(){
    this.authService.logout()
    .then( t=> {
      this.router.navigate(['/']);
    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
    });
  }
}
