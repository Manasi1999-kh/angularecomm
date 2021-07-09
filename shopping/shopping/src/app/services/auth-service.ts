import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements  CanActivate {
 
  constructor(public loginService: LoginService, public router: Router) {}
  canActivate(): boolean {
    if(this.loginService.isLogged()){
      return true;
    }else{
      this.router.navigate(['/signup'])
      return false;
    }
  }
}
