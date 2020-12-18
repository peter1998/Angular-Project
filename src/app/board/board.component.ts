import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BoardComment } from '../models/board-comment';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boards$: Observable<BoardComment[]>;
  user:User;
  error:string;
  
  commentForm : FormGroup  
  description : FormControl

  constructor(private service:BoardService,
    private authService:AuthService,
    ) { 
      this.authService.user.subscribe(u => {
        this.user = u; 
      })
    }

  ngOnInit(): void {

    this.boards$=this.service.getAll();

    this.description = new FormControl("", [Validators.required]);
    this.commentForm = new FormGroup({
      'description' : this.description
    });
  }

  addComent(){
    let boardComments:BoardComment = new BoardComment;
    boardComments.author = this.user.name;
    boardComments.comment = this.description.value;

    this.service.addComment(boardComments).then(
        c=> {
            this.commentForm.reset();
          }).catch (err => {
            this.error = "Ooops something bad happen amigo . Dont worry";
            console.log(err);
          }
      );
  }

}
