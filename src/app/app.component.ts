import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-project';
  items: Observable<any[]>;
  constructor(private db: AngularFirestore){

  }
  ngOnInit() {
    this.items = this.db.collection('users').valueChanges();

    this.items.subscribe( i=> {console.log(i)} );
  }

}


