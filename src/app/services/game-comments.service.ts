import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GameComments } from '../models/game-comments';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameCommentsService {

  gameComments: Observable<GameComments>

  constructor(private db: AngularFirestore) { }

  getComments(id: string) : Observable<GameComments[]>{
    return this.db.collection<GameComments>('games').doc(id).collection('comments').snapshotChanges()
          .pipe(
              map( a => 
                a.map( c => { return  c.payload.doc.data() as GameComments;} 
              )
                )
          )
  }
}
