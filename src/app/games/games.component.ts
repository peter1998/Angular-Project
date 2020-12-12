import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameServiceService } from '../game-service.service';
import { Game } from '../models/game';
import { AuthService } from '../services/auth.service';

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
    private service:GameServiceService,
    public authService:AuthService) 
    { }

  ngOnInit(): void {
    this.games$=this.service.getGames();
  }

  onAddNew(){
    this.router.navigate(['/edit/games/']);
  }

  onEdit(id:string){
    this.router.navigate(['/edit/games/', id]);
  }

  onDelete(id:string){
    if(confirm('Confirm deletion')) {
      this.service.deleteGame(id)
        .catch (
          err => {console.log(err);}
        );
    }
  }
}
