import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {ModuleComponent} from "./module/module.component";
import {ProgrammeComponent} from "./programme/programme.component";
import {ExerciceComponent} from "./exercice/exercice.component";
import {DetailsComponent} from "./exercice/details/detailsComponent";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "programme", component: ProgrammeComponent},
  {path: "modules/:lien", component: ModuleComponent},
  {path: "", component: HomeComponent},
  {path: "exercices/:lien/:codeModule", component: ExerciceComponent},
  {path: "exercices/details/:lien/:titre", component: DetailsComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
