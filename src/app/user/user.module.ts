import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserService} from './user.service'


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule
  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
