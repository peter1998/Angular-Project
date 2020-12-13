import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  email: FormControl;
  password: FormControl;

  errorMessage: string;
  successMessage: string;


  constructor(public authService:AuthService) { }

  ngOnInit(): void {

    
    this.email = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [Validators.required]);

    this.registerForm = new FormGroup({
      'email': this.email,
      'password': this.password
    });
  }

  register(){
   this.authService.signup(this.email.value,this.password.value)
   .then(value => {
     this.errorMessage = "";
     this.successMessage = "You have successfully registered and logged in,";
     this.registerForm.reset();
    
  })
  .catch(err => {
    this.errorMessage = err.message;
    console.log('Something went wrong:',err.message);
  });
  }



}
