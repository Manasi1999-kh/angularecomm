import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/Ilogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: any;
 
  constructor(private http:HttpClient) { }
  private url = 'http://localhost:5000/api' //connected to the node

  login(loginData:any){
    return this.http.post<any>('http://localhost:5000/api/login', loginData)
  }
  signup(data:any){
    return this.http.post<any>('http://localhost:5000/api/signup' , data);
  }

  isLogged(){
    return !!localStorage.getItem('token')
  }

  uploadImage(image:string){
    let user_id:any = localStorage.getItem('user_id');
    const formData = new FormData();
    formData.append("image" , image)
    return this.http.put<any>(`http://localhost:5000/api/upload/${user_id}` , formData )
  }
  public user:any;
  getUser(){
    let user_id = localStorage.getItem('user_id');
    this.http.get<any>(`http://localhost:5000/api/userProfile/${user_id}`).subscribe((res)=>{
      this.user = res;
    },
    (err)=>{
      console.log(err);
      
    })
  }
  
    upDateDetails(data:any){
      let user_id = localStorage.getItem('user_id');
      this.http.put<any>(`http://localhost:5000/api/update/${user_id}` , data).subscribe((res)=>{
        console.log(res);
        this.user = res;
        this.getUser()
      } , (err)=>{
        console.log(err);
        
      });
  }


  logOut(){
    localStorage.removeItem('user_id');
    localStorage.removeItem('token')
  }
}


