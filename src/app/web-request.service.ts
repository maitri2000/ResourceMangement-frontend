import { Injectable } from '@angular/core';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
   
  transfer;
  addObj;
 
  constructor(private tsk :TaskService) { 
  }
      
  
  createResourceList(resourceName:String,empId:Number){
     return this.tsk.post('lists',{resourceName,empId})
  }

  getResourceList(){
    return this.tsk.get('lists')
 }
   
 deleteResource(id:string)
 {
     return this.tsk.deleteResource(`lists/${id}`);
 }


  getProjects(id:string)
  {
       return this.tsk.getProjects(`projects/display/${id}`);
  }

  assignProject(projectId:Number,resourceId:Number){
       console.log("assign project of webreq service");
       return this.tsk.assignProject(`resources/${resourceId}/projects/${projectId}`);
 }
 skill(targetId)
 {
     return this.tsk.skills(`skills/${targetId}`);
 }

 postskills(targetId,payload)
 {
   //targetId is resourceId;
     return this.tsk.postskills(`skills/${targetId}`,payload);
 }

tranferSkills(skills)
{
  this.transfer=skills;
  return skills;
}
transferInfo()
{
  return this.transfer;
}


  
}
