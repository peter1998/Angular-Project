import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  gameId:string;
  commentForm : FormGroup  
  description : FormControl


  constructor(private service:GameCommentsService,
    private router:Router,
    public authService:AuthService,
    private activatedRoute: ActivatedRoute) 
    { }


  ngOnInit(): void {

    this.gameId  = this.activatedRoute.snapshot.paramMap.get("id");
    this.comments$=this.service.getComments(this.gameId);
    this.description = new FormControl("", [Validators.required]);
    this.commentForm = new FormGroup({
      'description' : this.description
    });

    this.comments$.subscribe(d=>{
      console.log(d);

    })
  }


  addComent(){

    let gameComments:GameComments = new GameComments;
    gameComments.author ='pepi';
    gameComments.comment = this.description.value;
    this.service.submitComment(this.gameId,gameComments).then(
        c=> {

          this.commentForm.reset();
        }

    );
  }


    
  

}
