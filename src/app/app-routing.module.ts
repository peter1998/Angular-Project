import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'games', component: GamesComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'game', component: LoginComponent},
  {path: 'game/:id', component: LoginComponent},
  {path: '', component: HomeComponent},


  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
