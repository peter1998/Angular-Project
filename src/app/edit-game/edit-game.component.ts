import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
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

  editForm: FormGroup;
  title: FormControl;
  description: FormControl;
  image: FormControl;

  constructor(private activatedRoute: ActivatedRoute,
    private router:Router,
    private service:GameServiceService) { }

  ngOnInit(): void {
    this.id  = this.activatedRoute.snapshot.paramMap.get("id");

      this.title = new FormControl("", [Validators.required]);
      this.description = new FormControl("", [Validators.required]);
      this.image = new FormControl("", [Validators.required]);

      this.editForm = new FormGroup({
        'title': this.title,
        'description': this.description,
        'image': this.image
      });

    if (this.id != null){
      this.loadGame();
    }
  }

  loadGame(){
    this.service.getGame(this.id)
        .subscribe(value => 
          {
            this.title.setValue(value.title);
            this.description.setValue(value.description);
            this.image.setValue(value.image);
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
          this.router.navigate(['/games/', this.id])
        )
      ),
      err => {
        console.log(err);
      }

    }else{

      this.service.addGame(game)
      .then(
        o => (
        this.router.navigate(['/games/', o.id])
        )
      ),
      err => {
        console.log(err);
      }
      
      this.router.navigate(['/games/']);

    }
  }

  onCancel() {
    let path : string[] = ['/games'];
    if (this.id != null) path.push(this.id);

    this.router.navigate(path);
  }

}
