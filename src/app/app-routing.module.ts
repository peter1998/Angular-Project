import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegisterComponent } from './register/register.component';
import { AdminGuardService } from './services/admin-guard.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BoardComponent } from './board/board.component';

 const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['user/login']);

const routes: Routes = [

  {path: 'about', component: HomeComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'user/details', component: UserDetailsComponent ,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},

  {path: 'board', component: BoardComponent ,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  
  {path: 'games/:id', component: GameDetailsComponent},
  {path: 'games', component: GamesComponent},
  
  
  {path:'edit/games/:id', component: EditGameComponent, canActivate: [AdminGuardService]},
  {path:'edit/games', component: EditGameComponent, canActivate: [AdminGuardService]},


  {path: '', component: GamesComponent},

  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
