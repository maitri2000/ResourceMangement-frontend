import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {  Observable, throwError ,of} from 'rxjs';
import {catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskInterceptorService implements HttpInterceptor {

  constructor(private auth:AuthService,public matRef:MatSnackBar) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    let tokenHeader=localStorage.getItem('x-access-token');
    
    let request=req;
  

    if(tokenHeader){
   request = req.clone({
    setHeaders:{
            'x-access-token' :tokenHeader,
    }
   
  })
  
}

  
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>
      {
        console.log(error);
        if(error)
        {
          //unauthorized
          //refresh the local storage if any and redirect to login page 
          
            
       let ref=this.matRef.open("Credentials Wrong or Admin didn't Add you","Close",{
            panelClass:'big-snackbar',
            horizontalPosition:"center",
            verticalPosition:'top'
       })
         
          this.auth.logout();
        }
        return throwError(error);
      })
      
    );
    
  

  
 
}
  
}
