import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): boolean {
    
    var validuser = localStorage.getItem('valid_user');
  if(validuser == null || validuser == '' || validuser == undefined)
{
      this.router.navigate(['/login'],{ replaceUrl: true });
      this.authService.preventBackButton();
      this.authService.logout();
      return false;
}
else{
  return true
}
    // const token = localStorage.getItem('accessToken');    
    // if (token && this.authService.isTokenExpired(token)) {      
    //   this.router.navigate(['/login'],{ replaceUrl: true });
    //   this.authService.logout();
    //   return false;
    // } else {
    //     return true;
    // }

  }


}