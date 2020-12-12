import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private service:GameServiceService) 
    { }

  ngOnInit(): void {
    this.games$=this.service.getGames();
  }

  onAddNew(){
    this.router.navigate(['/edit/games/']);
  }


}
