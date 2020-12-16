import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameComments } from '../models/game-comments';
import { AuthService } from '../services/auth.service';
import { GameCommentsService } from '../services/game-comments.service';

@Component({
  selector: 'app-game-comments',
  templateUrl: './game-comments.component.html',
  styleUrls: ['./game-comments.component.css']
})
export class GameCommentsComponent implements OnInit {

  comments$: Observable<GameComments[]>;
  id:string;
  constructor(private service:GameCommentsService,
    private router:Router,
    public authService:AuthService,
    private activatedRoute: ActivatedRoute) 
    { }

  ngOnInit(): void {

    this.id  = this.activatedRoute.snapshot.paramMap.get("id");
    this.comments$=this.service.getComments(this.id);

    this.comments$.subscribe(d=>{
      console.log(d);

    })
  }


}
