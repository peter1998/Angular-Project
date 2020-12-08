import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GameServiceService } from '../game-service.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games$: Observable<Game[]>;

  constructor( 
    private service: GameServiceService,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.games$=this.service.getGames();
  }

}
