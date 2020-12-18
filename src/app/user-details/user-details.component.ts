import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  errorMessage:string;
  successMessage:string;

  user: User;
  edit: boolean;

  editForm: FormGroup;
  name: FormControl;


  constructor(private authService: AuthService) {

    this.name = new FormControl("", [Validators.required]);
    this.editForm = new FormGroup({
      'name': this.name
    });

    this.authService.user.subscribe(u => {
        this.user = u;
        if (u != null){
          this.name.setValue(u.name);
        }
      });
  }

  ngOnInit(): void {
  }
  
  update(){
    
    this.authService.update(this.user.id, this.name.value)
    .then(value => {
      this.errorMessage = "";
      this.successMessage = "You have successfully updated the name.";
      window.location.reload(); //force entiire page to reload
    })
    .catch(err => {
      this.errorMessage = err.message;
      console.log('Something went wrong:', err.message);
    });
  }

  logout(){
    this.authService.logout()
    .catch(err => {
      this.errorMessage = "Something went wrong";
      console.log('Something went wrong:',err.message);
    });
  }


}
