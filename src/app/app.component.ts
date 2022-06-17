import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent   implements OnInit{
  title = 'admin-panel-layout';
  sideBarOpen = true;
  userName="";
  empId='';
  constructor(private tsk:TaskService)
  {}

  ngOnInit(){
      this.empId=localStorage.getItem('empId');
      console.log("your employee id");
      console.log(this.empId);
      
  }
      
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
    
    


}
