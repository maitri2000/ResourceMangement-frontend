import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  resourceID:any;
  constructor(private web:WebRequestService,private route:ActivatedRoute,private matRef:MatSnackBar) { }
 

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>
    {
         //console.log("This is the dynamic part of the route");
         console.log("From New Project component url now is");
         console.log(params);
         this.resourceID=params['id'];
        //{id: '1'} gets printed extracted from url localhost:4200/view/1  as in routing view/:id 
       
    })

     
    }
    assignProject(input:Number)
    {
      console.log("hey add project button is clicked");
       console.log(this.resourceID);
       console.log(input);
       this.web.assignProject(input,this.resourceID).subscribe((res:any)=>
       {
        
        if(res.error==false)
        this.showSnack(res.msg,'big-snackbar-success')
     else
         this.showSnack(res.msg,'big-snackbar');
         console.log(res.msg);
       });
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
