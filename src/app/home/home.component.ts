import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
prjname;
prjlist;
skilllist;
skills;
stdate;
stdatelist;
eddate;
eddatelist;
n;
nlist;
des;
deslist;
  constructor() { }
  ngOnInit(): void {
    this.prjlist=[];
    this.skilllist=[];
    this.stdatelist=[];
    this.eddatelist=[];
    this.nlist=[];
    this.deslist=[];
  }
  addproject(){
    this.prjlist.push({name : this.prjname});
    this.skilllist.push({name :this.skills});
    this.stdatelist.push({name :this.stdate});
    this.eddatelist.push({name :this.eddate});
    this.nlist.push({name :this.n});
    this.deslist.push({name :this.des});
    this.prjname='';
        this.skills='';
        this.stdate='';
        this.eddate='';
        this.n='';
        this.des='';
  }
  delproj(name){
    for(var i=0;i<this.prjlist.length;i++)
    {
      if(this.prjlist[i]["name"]==name){
          this.prjlist.splice(i,1);
          this.skilllist.splice(i,1);
          this.stdatelist.splice(i,1);
          this.eddatelist.splice(i,1);
          this.nlist.splice(i,1);
          this.deslist.splice(i,1);
      }
    }
  }
  editprj(name,name1,name2,name3,name4,name5)
  {
    for(var i=0;i<this.prjlist.length;i++)
    {
      if(this.prjlist[i]["name"]==name){
        this.prjname=name;
        this.skills=name1;
        this.stdate=name2;
        this.eddate=name3;
        this.n=name4;
        this.des=name5;
         this.prjlist.splice(i,1);
          this.skilllist.splice(i,1);
          this.stdatelist.splice(i,1);
          this.eddatelist.splice(i,1);
          this.nlist.splice(i,1);
          this.deslist.splice(i,1);
      }
    }
  }

}
