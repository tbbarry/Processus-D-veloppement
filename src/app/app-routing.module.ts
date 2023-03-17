import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {ModuleComponent} from "./module/module.component";
import {ProgrammeComponent} from "./programme/programme.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "programme", component: ProgrammeComponent},
  {path: "modules/:lien", component: ModuleComponent},
  {path: "", component: HomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
