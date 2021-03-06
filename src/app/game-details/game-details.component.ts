import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameServiceService } from '../game-service.service';
import { GamesComponent } from '../games/games.component';
import { Game } from '../models/game';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  
  game: Game;
  id: string;
  isAdmin$: Observable<boolean>;

  constructor(private activatedroute: ActivatedRoute,
    private router:Router,
    private service:GameServiceService,
    public authService:AuthService) { }


  ngOnInit(): void {

    this.isAdmin$ = this.authService.isAdmin()
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

  onCancel(){
    this.router.navigate(['/games/']);
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


}}
