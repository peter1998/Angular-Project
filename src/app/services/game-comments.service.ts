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

  getComments(gameId: string) : Observable<GameComments[]>{
    return this.db.collection<GameComments>('games').doc(gameId).collection('comments').snapshotChanges()
          .pipe(
              map( a => 
                a.map( c => { return  c.payload.doc.data() as GameComments;} 
              )
                )
          )
  }


  submitComment(gameId:string, gameComments:GameComments): Promise<any>{
    return this.db.collection<GameComments>('games').doc(gameId).collection('comments')
    .add({ description: gameComments.comment,
          author:gameComments.author
    });
    }
}
