import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { NewListComponent } from './new-list/new-list.component';
import { AddProjectComponent } from './add-project/add-project.component'; 

import { ProjectComponent } from './project/project.component';
import { ResourceComponent } from './resource/resource.component';

import { TaskViewComponent } from './task-view/task-view.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
const routes: Routes = [


  
    //doubt-is routing the only way to load a component
   {path:'view',component:TaskViewComponent},
  { path: 'resource', component:ResourceComponent},
  { path: 'project', component: ProjectComponent },
  { path: 'project/displayEdit', component: ProjectComponent },
  { path: 'skills', component: AddSkillsComponent },
   {path:'addskills',component:AddSkillsComponent},
  {path :'view/:id',component:ResourceComponent},
  {path:'view/:id/assignProject', component: AddProjectComponent},
  {path:'login',component:LoginFormComponent},
  {path:'home',component:HomeComponent},
   {path :'skills/:selected/:yours',component:AddSkillsComponent},
   {path:'display',component:AppComponent},
  {path :'newResource',component : NewListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
