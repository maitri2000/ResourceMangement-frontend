import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Output ,EventEmitter} from '@angular/core';
import { TaskService } from './task.service';
import {Router} from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() nameDisplay:EventEmitter<any> =new EventEmitter ();

  constructor(private http:HttpClient,private tsk:TaskService,private router:Router,private matRef:MatSnackBar) { }
  
  login(name:String,empId:String)
  {
      return this.tsk.login(name,empId).pipe(
          tap((res:HttpResponse<any>)=>
          {

            let ref=this.matRef.open("Login Successful","Close",{
              panelClass:'big-snackbar-success',
              horizontalPosition:"center",
              verticalPosition:'top'
            });
            
           return this.setSession(res.body.empId,res.headers.get('x-access-token'),res.headers.get('x-refresh-token')) 
          
            //the auth tokens will be in the header
           
           
            console.log("response from the tap part");
            console.log(res);
       })
       )
  }
  logout()
  {
   
    console.log("logout called");
    this.removeSession();
    this.router.navigate(['/login']);
  }
  private setSession(empId:string,accessToken:any,refreshToken:any)
  {
         localStorage.setItem('empID',empId);
         localStorage.setItem('x-access-token',accessToken);
         localStorage.setItem('x-refresh-token',refreshToken);
         this.tsk.getName({empID:localStorage.getItem('empID')}).subscribe((response:any)=>
         {  
             
          
          this.nameDisplay.emit(response);     
              
         });
          
  }

  finalDisplay()
  {
    return this.nameDisplay;
  }
  private removeSession()
  {
         localStorage.removeItem('empID');
         localStorage.removeItem('x-access-token');
         localStorage.removeItem('x-refresh-token');
         
  
  }

}
