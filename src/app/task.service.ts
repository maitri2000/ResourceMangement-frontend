import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly ROOT_URL;

  constructor(private http:HttpClient) {
       this.ROOT_URL=`http://localhost:3000`;
   }

   get(uri:string)
   {
     return this.http.get(`${this.ROOT_URL}/${uri}`);
   }

   post(uri:string,payload:Object)
   {
     //payload is an object that is going to be appended to req.body 
     console.log("post has been called");
     return this.http.post(`${this.ROOT_URL}/${uri}`,payload);
   }
   
   patch(uri:string,payload:Object)
   {

     return this.http.patch(`${this.ROOT_URL}/${uri}`,payload);
   }
   deleteResource(uri:string)
   {
     console.log(uri);
     console.log("delete resource from tsk service");
     console.log(`${this.ROOT_URL}/${uri}`);
     return this.http.delete(`${this.ROOT_URL}/${uri}`);
   }
  
   getProjects(uri:string)
   {
        return  this.http.get(`${this.ROOT_URL}/${uri}`)
   }

   assignProject(uri:string)
   {
     return this.http.post(`${this.ROOT_URL}/${uri}`,{});
   }
   
   login(name:String,empId:String)
   {
     console.log("sending request to backend");
     console.log(name);
     console.log(empId);
     return this.http.post(`${this.ROOT_URL}/users/login`,{
       name,
       empId
     },{observe:'response'});
   }

   skills(uri:string)
   {
        return this.http.get(`${this.ROOT_URL}/${uri}`);
   }
   postskills(uri:string,payload)
   {
      console.log("The payload from frontend is");
      console.log(payload);
       return this.http.post(`${this.ROOT_URL}/${uri}`,payload);
   }
   displayProjects()
   {
         return this.http.get(`${this.ROOT_URL}/getprojects`);
   }
   postProject(payload)
   {
       return this.http.post(`${this.ROOT_URL}/addNewProject`,payload);
   }

   patchProject(payload)
   {
     return this.http.patch(`${this.ROOT_URL}/editProject`,payload);
   }

   deleteProject(payload)
   {
       return this.http.delete(`${this.ROOT_URL}/deleteProject/${payload.projectId}`);
   }

   getName(payload)
   {
     return this.http.post(`${this.ROOT_URL}/getName`,payload);
   }

}
