import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GameDetailsComponent } from './game-details/game-details.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';


// Reactive Form Module
import { ReactiveFormsModule } from '@angular/forms';
import { EditGameComponent } from './edit-game/edit-game.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './register/register.component';
import { GameCommentsComponent } from './game-comments/game-comments.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GamesComponent,
    ContactsComponent,
    LoginComponent,
    NotFoundComponent,
    GameDetailsComponent,
    EditGameComponent,
    RegisterComponent,
    GameCommentsComponent,
    UserDetailsComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    UserModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,{
    provide: UserService,useClass: UserService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
