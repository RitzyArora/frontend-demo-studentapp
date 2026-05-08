import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:any=null;

  constructor(private http:HttpClient) { }
  register(data:any){
  return this.http.post(
    `${environment.api}/Auth/register`,
    data
  );
}

  login(data:any):Observable<any>{
    return this.http.post(
      `${environment.api}/Auth/login`,
      data
    );
  }

  getCurrentUser():Observable<any>{
    return this.http.get(
      `${environment.api}/Auth/me`
    );
  }

  loadCurrentUser():void{
    this.getCurrentUser().subscribe({
      next:(user)=>{
        this.currentUser=user;
      },
      error:()=>{
        this.currentUser=null;
      }
    });
  }

  logout():Observable<any>{
    return this.http.post(
      `${environment.api}/Auth/logout`,
      {}
    ).pipe(
      tap(()=>{
        this.currentUser=null;
      })
    );
  }

  isLoggedIn():boolean{
    return this.currentUser!=null;
  }

  isAdmin():boolean{
    return this.currentUser?.role.toLowerCase()==='admin';
  }

  getUserRole():string{
    return this.currentUser?.role || '';
  }
}
