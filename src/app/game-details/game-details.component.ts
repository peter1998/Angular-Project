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

    this.id = this.activatedroute.snapshot.paramMap.get("id");
    if(this.id !=null)
    {
      this.showGame();    
    }

  }


showGame(){
  this.service.getGame(this.id)
      .subscribe(value => 
        {
          this.game = value;
        });
      }

  onEdit(){
    console.log("Test EDIT work");

    this.router.navigate(['/edit/game/', this.game.id]);

  }

  onCancel(){
    this.router.navigate(['/games/']);
  }


}
