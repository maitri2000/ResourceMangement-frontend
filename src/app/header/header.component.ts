import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username;
  display:any;
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  
  constructor(private router: Router , private tsk:TaskService,private auth:AuthService,private log:AuthService) {}

  ngOnInit(): void {
   
    this.username=localStorage.getItem('empID');
   
    this.tsk.getName({empID:this.username}).subscribe((response:any)=>
    {  console.log(response);

      this.display=response.name;
      
    });
    console.log("name from header");
  
    console.log(this.display);

    this.auth.finalDisplay().subscribe((nameObtained)=>
    {
       this.display=nameObtained.name;
      console.log(nameObtained.name);
    })

  }

  logout()
  {
    console.log("LOGOUT INITIATED");
    this.auth.logout();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
