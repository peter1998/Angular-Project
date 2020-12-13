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

  signup(email: string, password: string): Promise<any> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password);
      
  }

  login(email: string, password: string) : Promise<any>{
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password);
     
  }

  logout() : Promise<any>{
   return this.firebaseAuth.signOut();
  }
}
