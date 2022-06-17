import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent implements OnInit {
 
  skilllist:Array<any> ;
  skilllist2=[];
  c : number=0;
  newSkill;
  skillage;

  yours='';
  selectedId='';
  message='';
  dis=false
  constructor(private route:ActivatedRoute,private router:Router,private web:WebRequestService,private matRef:MatSnackBar) { }
   
  ngOnInit() {
    console.log("from init");
    console.log(this.web.transferInfo);
    this.skilllist=this.web.transferInfo();
    if(this.skilllist==undefined)
    { 
      this.dis=true;
      return;
    }
    if(this.skilllist.length==1){
     this.skilllist=this.skilllist[0].skills;
     console.log("yaay");
     console.log(this.skilllist);
     this.c=this.skilllist.length;
    }
    for(var i=0;i<this.skilllist.length;i++)
    {
      this.skilllist2.push({name : this.skilllist[i]});
    }
    this.route.params.subscribe((params:Params)=>
    {
         //console.log("This is the dynamic part of the route");
        // console.log(params);
        //{id: '1'} gets printed extracted from url localhost:4200/view/1  as in routing view/:id 
         //return array of info(id) from backend,assign array of info list in component,access each array element
         //in ngfor with a tag ,attach it in url and get the id in component,
         this.yours=params['yours'];
         this.selectedId=params['selected'];
         console.log("from add skills component");
         console.log(this.yours);
         console.log(this.selectedId);
         //if u come directly to skills without coming through resource management this message is shown.
         this.showMsg();
       
    })
  }
  showMsg()
  {
    
   
    if(!this.yours)
      this.message="Please choose a Resource from Resource Management component";

  }
addSkill()
{
  if(this.newSkill=='')return ;
   
  this.skilllist2.push({name : this.newSkill});
  this.c++;
  console.log("addskill");
  console.log(this.skilllist2);
  this.newSkill='';
}
deleteSkill(name){
  for(var i=0; i<this.skilllist2.length;i++)
  {
    if(this.skilllist2[i]["name"]==name){
      this.skilllist2.splice(i,1);
    }
  }
  this.c--;
}
finalSubmission()
{
    console.log("Final Submission");
    console.log(this.skilllist2);
    this.web.postskills(this.selectedId,this.skilllist2).subscribe((res:any)=>
    {
      console.log(res);
      if(res.error==false)
         this.showSnack(res.msg,'big-snackbar-success')
     else
       this.showSnack(res.msg,'big-snackbar');
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
