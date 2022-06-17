
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  loginFunc(name:string,empID:string)
  {
      console.log("login button is clicked");
       this.auth.login(name,empID).subscribe((res)=>
        {
            console.log("response after login from backend to task to auth to login component");
            console.log(res);
        }) 
        
  }
}
