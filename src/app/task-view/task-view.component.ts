import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebRequestService } from 'src/app/web-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  displayList:any;
  projectList:any;
  selectedId:any;
  show=false;
  msg='';
  constructor(private web:WebRequestService,private route:ActivatedRoute,private router:Router,public matRef:MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>
    {
         //console.log("This is the dynamic part of the route");
        // console.log(params);
        //{id: '1'} gets printed extracted from url localhost:4200/view/1  as in routing view/:id 
         //return array of info(id) from backend,assign array of info list in component,access each array element
         //in ngfor with a tag ,attach it in url and get the id in component,
        this.web.getProjects(params['id']).subscribe((projects:any)=>
        {
             console.log("Projects for the clicked id ");
             console.log(params['id']);
             console.log(projects);
             this.projectList=projects;
             this.selectedId=params['id'];
        })
    })

      this.web.getResourceList().subscribe((resourcelist:any)=>
      {
        console.log("The resource list obtained from backend is ");
        console.log(resourcelist);
        this.displayList=resourcelist;
      })
    }
   createProject()
    {
      console.log("presemt route is");
      console.log(this.route.url);
       this.router.navigate(['assignProject'],{relativeTo:this.route})
         
      
    }
    



    //without subscription the backend delete route is not even hit or printed  why .

    deleteResource()
{
     console.log("The id selected to be deleted is");
     console.log(this.selectedId);
     if(this.selectedId)
     this.web.deleteResource(this.selectedId).subscribe((res:any)=>
     {
           console.log("after subscription of delete Resource");
           console.log(res);
           if(res.error==false)
              this.showSnack(res.msg,'big-snackbar-success')
           else
               this.showSnack(res.msg,'big-snackbar');
            this.web.getResourceList().subscribe((resourcelist:any)=>
            {
             
              this.displayList=resourcelist;
            })
        
     });
     else
     {
       let ref=this.matRef.open("Please select the resource to be deleted","Close",{
         panelClass:'big-snackbar',
         horizontalPosition:"center",
         verticalPosition:'top'
       });
      
   
     }
}

showSnack(msg,type)
{
  let ref=this.matRef.open(msg,"Close",{
    panelClass:[type],
    horizontalPosition:"center",
    verticalPosition:'top'
  });
}
showSkills()
{
  //
  console.log("button clicked");
  this.web.skill(this.selectedId).subscribe((res:any)=>
  {
    //selected id is in resource table remember that 
    console.log(res);
    console.log(res.yours);
   var transferarr=res.userskills;
    //show get view 
    this.web.tranferSkills(transferarr);
    this.router.navigate([`skills/${this.selectedId}/${res.yours}`]);
    //add/delete view according to the result obtained;

  });

}
 

}


