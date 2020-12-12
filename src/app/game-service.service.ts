import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { GamesComponent } from './games/games.component';
import { Game } from './models/game';
import { map } from 'rxjs/operators';
import { TESTGAMES } from './services/test-data';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(private db: AngularFirestore) { }

 getGames():Observable<Game[]>{
  return this.db.collection<Game>('games').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Game;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
 }

 
 getGame(id: string) : Observable<Game> {
  return this.db.collection<Game>('games').doc(id)
    .get()
    .pipe(
        map( d => {
          return { id, ...d.data() }
        }
      )
    );
}

updateGame(game: Game){
  return this.db.collection<Game>('games').doc(game.id)
          .update({
            title: game.title,
            description: game.description,
            image: game.image
          });
}

addGame(game: Game){
  return this.db.collection('games')
          .add({
            title: game.title,
            description: game.description,
            image: game.image
          });
}

deleteGame(id: string){
  return this.db.collection('games').doc(id).delete();
}

 
}
