import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAllJSDocTagsOfKind } from 'typescript';
import { BoardComment } from '../models/board-comment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boardComments: Observable<BoardComment[]>;

  constructor(private db: AngularFirestore) { }

  addComment(boardComment: BoardComment){
    return this.db.collection('boards')
          .add({
            author: boardComment.author,
            comment: boardComment.comment
          });
  }

  getAll(): Observable<BoardComment[]>{
      return this.db.collection('boards').stateChanges().pipe(
        map( a => 
          a.map( c => { return  c.payload.doc.data() as BoardComment;} )
         ))
  }
}
