import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TaskService } from '../task.service';
import { WebRequestService } from '../web-request.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  projectForm2:any;
  payload:any;
  projectForm=new FormGroup({
    projectname:new FormControl(),
    projectid:new FormControl(),
  });
  isEdit=false;
  btnText="Save";
  originalId:any;
  constructor(private tsk:TaskService,private web:WebRequestService,private route:Router,
    @Inject(MAT_DIALOG_DATA) public data:any,private matRef:MatSnackBar
    ) { }


  ngOnInit(): void {

  
      if(this.data){
       this.btnText="Update";
       this.isEdit=true;
      console.log("mat dialog data");
      console.log(this.data);
      this.projectForm.controls['projectname'].setValue(this.data.projectName);
      this.projectForm.controls['projectid'].setValue(this.data.projectId);
      this.originalId=this.data.projectId;
      }

  }
  
  

 

  addFunc()
  {
    if(this.isEdit==false){
    console.log(this.projectForm.value);
    this.payload=this.projectForm.value;
    this.tsk.postProject(this.payload).subscribe((res:any)=>
    {
     console.log(res);
     if(res.error==false)
     this.showSnack(res.msg,'big-snackbar-success')
       else
    this.showSnack(res.msg,'big-snackbar');
     this.route.navigate(['project/displayEdit']);
     
    });
    console.log(this.payload);
  }
  else{
    let editPayload={...this.projectForm.value,originalId:this.originalId};
    this.tsk.patchProject(editPayload).subscribe((res:any)=>
    {
      if(res.error==false)
      this.showSnack(res.msg,'big-snackbar-success')
        else
     this.showSnack(res.msg,'big-snackbar');
      this.route.navigate(['project/displayEdit']);
    })
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
  

}
