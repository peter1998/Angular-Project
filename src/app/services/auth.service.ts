import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) { 
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password);
      // .then(value => {
      //   console.log('Nice, it worked!');
      // })
      // .catch(err => {
      //   console.log('Something went wrong:',err.message);
      // });
  }

  logout() {
    this.firebaseAuth.signOut();
  }
}
