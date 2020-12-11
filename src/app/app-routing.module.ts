import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'games', component: GamesComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'game/:id', component: GameDetailsComponent},
 
  {path:'edit/game/:id', component: EditGameComponent},
  {path:'new/game', component: EditGameComponent},

  {path: '', component: HomeComponent},

  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
