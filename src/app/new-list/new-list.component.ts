import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute,Params } from '@angular/router';

import { WebRequestService } from 'src/app/web-request.service';
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  constructor(private web:WebRequestService,private matRef:MatSnackBar) { }

  ngOnInit(): void {
    console.log("nginit is running");
   
  }

  createResource(name:String , empId:Number)
  {
     
      console.log("button clicked hurray to add new resource");
        
      this.web.createResourceList(name,empId).subscribe(
           (res:any)=>
           {
             console.log("Response when buton clicked");
             
             if(res.error==false)
              this.showSnack(res.msg,'big-snackbar-success')
                else
             this.showSnack(res.msg,'big-snackbar');
             
           }
        )
        
    }  
    showSnack(msg,type)
    {
      let ref=this.matRef.open(msg,"Close",{
        panelClass:[type],
        horizontalPosition:"center",
        verticalPosition:'top'
      }); 
  }
}

  
 
  
  