import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GamesComponent } from './games/games.component';
import { Game } from './models/game';
import { TESTGAMES } from './services/test-data';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor() { }

 getGames():Observable<Game[]>{
   return of(TESTGAMES);
 }
}
