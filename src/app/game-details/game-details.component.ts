import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameServiceService } from '../game-service.service';
import { GamesComponent } from '../games/games.component';
import { Game } from '../models/game';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  
  game: Game;
  id: string;

  constructor(private activatedroute: ActivatedRoute,
    private router:Router,
    private service:GameServiceService) { }


  ngOnInit(): void {
  this.activatedroute.paramMap.subscribe(params=>{
    console.log(params);
    this.id = params.get('id');
    if (this.id != null){
      this.game = this.service.getGame(this.id);
      console.log(this.game);
    }
  });
  }

}
