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

  constructor(private firebaseAuth: AngularFireAuth,
              private db: AngularFirestore) { 
      
      this.user = this.firebaseAuth.authState.pipe(
        switchMap(user => {
          if (user){
            return this.getDetails(user);
          }else{
            return of(null);
          }
        }
      )
    )
  }

  signup(email: string, password: string, name: string): Promise<any> {
    return this.firebaseAuth
          .createUserWithEmailAndPassword(email, password)
          .then( u => {
            return this.db.collection('users').doc(u.user.uid)
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
  
  isLoggedIn() : Observable<boolean> {
    return this.user
            .pipe(
              map (
                u => {
                  return (u !== null);
                }
              )
            )
  }

  isAdmin() : Observable<boolean> {
    return this.isInRole("admin");
  }

  isInRole(role) : Observable<boolean> {
    return this.user
          .pipe(
              map( u => {
                  return ((u !== null) && (u.role === role));
                }
              )
          );
  }
}