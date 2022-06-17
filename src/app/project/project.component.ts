import { getLocaleDateFormat } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {
  displayedColumns = ['projectName', 'projectId', 'totalRes','action'];
  dataSource:any;
  loop;
  display:any;
  constructor(private dialog:MatDialog,private tsk:TaskService,private auth:AuthService,private matRef:MatSnackBar,private ref2:MatDialogRef<DialogComponent>) { }
  getData(){
    this.tsk.displayProjects().subscribe((res:any)=>
     {
      this.loop=[];
 
       console.log(res.ans);
         res.ans.map((obj)=>
         {
           var objTemp={};
           objTemp["projectName"]=obj.projectName;
           objTemp["projectId"]=obj.projectId;
           if(obj.innerArray==undefined)
           {
             objTemp["totalRes"]=0;
           }
           else
           {
             objTemp["totalRes"]=obj.totalRes;
           }
           objTemp["action"]=
            this.loop.push(objTemp);

         })
         this.dataSource=new MatTableDataSource(this.loop);
         console.log("my arr of obj");
         console.log(this.loop);
     }
     );
    }

  ngOnInit(): void {
   
    console.log("ngonit");
   
    this.getData();
 


this.tsk.getName({empID:localStorage.getItem('empID')}).subscribe((response:any)=>
    {  console.log(response);

      
      if(response.isAdmin==true)
     this.display=true;
     else
     this.display=false;
      
    });
  }
  editData(row)
  {
    if(this.display==false)
    {

        
        
 this.showSnack("Only Admin can Edit",'big-snackbar');
        return;
    }

    console.log("before sending the data to mat");
    console.log(row);
    let refu=this.dialog.open(DialogComponent,{
      width:'30%',
     data:row
    })

  refu.afterClosed().subscribe((res)=>
  {
    console.log("result after closing dialog ");
            
   
    this.getData();
    console.log("after closed called");

    console.log(res);
  })
  }

  deleteData(row)
  {
    if(this.display==false)
    {

        
        
 this.showSnack("Only Admin can Delete",'big-snackbar');
        return;
    }
    console.log("DELETE BUTTON IS CLICKED");
    console.log(row);
     this.tsk.deleteProject(row).subscribe((res:any)=>
     {
         
if(res.error==false)
this.showSnack(res.msg,'big-snackbar-success')
else
 this.showSnack(res.msg,'big-snackbar');
         this.getData();
     });
  }
  
  openDialog()
  {
    let ref=this.dialog.open(DialogComponent,{
     width:'30%'
  });
  ref.afterClosed().subscribe((res)=>
  {
    console.log("result after closing dialog ");
                       
    
    this.getData();
    console.log("after closed called");

    console.log(res);
  })
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
  
  




