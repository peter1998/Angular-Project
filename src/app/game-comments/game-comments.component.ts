import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameComments } from '../models/game-comments';
import { User } from '../models/user';
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

  user:User;
  error:string;

  constructor(private service:GameCommentsService,
    private router:Router,
    private authService:AuthService,
    private activatedRoute: ActivatedRoute) 
    { 

      this.authService.user.subscribe(u => {
        this.user = u; 
      })
    }


  ngOnInit(): void {

    this.gameId  = this.activatedRoute.snapshot.paramMap.get("id");
    this.comments$=this.service.getComments(this.gameId);
    this.description = new FormControl("", [Validators.required]);
    this.commentForm = new FormGroup({
      'description' : this.description
    });
  }


  addComent(){

    let gameComments:GameComments = new GameComments;
    
    gameComments.author = this.user.name;
    gameComments.comment = this.description.value;
    this.service.submitComment(this.gameId,gameComments).then(
        c=> {
          this.commentForm.reset();
        }).catch (err => {
          this.error = "Ooops something bad happen amigo . Dont worry";
          console.log(err);
        })
  }
}
