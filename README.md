# PC Catalog

The PC Catalog is a web application about viewing the modern games and sharing gamer comments about each one of them.

It uses Angular for front End, Firebase for back-end and Bootstrap for UI.

The application has public part, private part for registered users and managing part.
The public part is accessible for everyone.
The registered users can comment the games or left messages in the message-board.
The administrator can add or edit games.

## Application Structure 

### Components
NavbarComponent
HomeComponent
GamesComponent
ContactsComponent
LoginComponent
NotFoundComponent
GameDetailsComponent
EditGameComponent
RegisterComponent
GameCommentsComponent
UserDetailsComponent
BoardComponent

### Services:
GameServiceService
GameCommentsService
BoardService
AuthService
AdminGuardService

### Models: 
User
Game
GameComments
BoardComments

## Public Part

The pages About and Contacts are static. Used components are HomeComponent and ContactsComponent
 
The page Games is dinamic, it uses GamesComponent.

 ## Private Part

The Board page allows registered users to post messages. 
It uses the BoardComponent.

For adding game comments the component is GameCommentsComponent. 

The private pages are secured via AuthGuard and AdminGuard. 

## Installing

Installing NGBootstrap 

ng add @ng-bootstrap/ng-bootstrap

Installing AngularFire (The official Angular library for Firebase.)

ng add @angular/fire


## Deployment

Create a production build

ng build --prod

Copy everything within the output folder (dist/project-name/)

Configure the server to redirect requests for missing files to index.html

## Authors

Peter Matov 

## License
This project is licensed under the GNU License

