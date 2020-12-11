import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import { GameServiceService } from '../game-service.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  id:string;
  // isNew: boolean = true;
  editForm: FormGroup;
  oldimage:string;
  constructor(private activatedRoute: ActivatedRoute,
    private router:Router,
    private service:GameServiceService) { }

  ngOnInit(): void {

    this.id  = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id != null){
      this.loadGame();
    }else{

      this.editForm = new FormGroup({
          title: new FormControl(""),
          description: new FormControl(""),
          image: new FormControl("")
      });
    }
  }

  loadGame(){
    this.service.getGame(this.id)
        .subscribe(value => 
          {
            this.editForm = new FormGroup({
                title: new FormControl(value.title),
                description: new FormControl(value.description),
                image: new FormControl(value.image)
              });

            // this.isNew = false;
            this.oldimage = value.image;
          });

  }

  onSubmit() {

    let game = new Game();
    game.id = this.id;
    game.title = this.editForm.get('title').value;
    game.description = this.editForm.get('description').value;
    game.image = this.editForm.get('image').value;

    if (game.id != null){

      this.service.updateGame(game)
      .then(
        o => (
          this.router.navigate(['/game/', this.id])
        )
      ),
      err => {
        console.log(err);
      }

    }else{

      this.service.addGame(game)
      .then(
        o => (
          //console.log(o.id)
        this.router.navigate(['/game/', o.id])
        )
      ),
      err => {
        console.log(err);
      }

      //todo: use await update operation before navigation
      this.router.navigate(['/games/']);

    }
  }

  onCancel() {
    this.router.navigate(['/game/', this.id]);
  }

  

}
