import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  userDetails: User = null;

  constructor(private firebaseAuth: AngularFireAuth,
              private db: AngularFirestore) { 
      
      //firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(_ => {

        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
              this.user = this.getDetails(user);
              this.user.subscribe((userDetails) => {
                this.userDetails = userDetails;
              })
            }
          }
        )

    //})

    /*
    firebaseAuth.authState.subscribe((user) => {
          if (user) {
            this.user = this.getDetails(user);
            this.user.subscribe((user) => {
              this.userDetails = user;
            })
          }
        }
      );
      */
  }

  signup(email: string, password: string, name: string): Promise<any> {
    return this.firebaseAuth
          .createUserWithEmailAndPassword(email, password)
          .then( u => {
            return this.db.collection('users')
                .doc(u.user.uid)
                .set({role:"user", name: name});
          });
  }

  login(email: string, password: string): Promise<any> {
      return this.firebaseAuth
          .signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    return this.firebaseAuth.signOut()
          .then( d => {
            this.user = of(null);
            }
          );
  }

  private getDetails(user : firebase.User) : Observable<User>{
    return this.db.collection('users').doc<User>(user.uid)
          .get()
          .pipe(
            map((d) => {
                    return {
                      id: user.uid,
                      email: user.email,
                      ...d.data() //email, role
                    }
                }
              )
            );
  }

  isLoggedIn() {
    return (this.userDetails != null);
  }

  isInRole(role) : boolean{
    return (this.userDetails?.role === role);
  }
}