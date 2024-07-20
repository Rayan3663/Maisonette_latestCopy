import { Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private timeout: any;
  private idleTime: number = 12000; // Time in milliseconds 
  private tokenExpirationTime = 12000; // Token expiration time in milliseconds
  private userInteraction:boolean = false;
  private intervalId: any;
  constructor(private authService: AuthService, private ngZone: NgZone, private router:Router) {
    this.init();
    
  }

  init() {    
    this.resetTimeout();
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('click', () => this.resetTimeout());
      document.addEventListener('keydown', () => this.resetTimeout());
      document.addEventListener('mousemove', () => this.resetTimeout());
      document.addEventListener('scroll', () => this.resetTimeout());
    });
  }

  private resetTimeout() {
    this.authService.resetTimeout();
  }

  // resetTimer() {       
   
  //    this.resetTimeout();
  //     // this.checkToken()
  // }

  checkToken():boolean {
    debugger
    var validuser = localStorage.getItem('valid_user');
    const token = this.authService.getToken();

    if(validuser == null || validuser == '' || validuser == undefined)
   {
    return false;
   }
    
    if (token && this.authService.isTokenExpired(token)) {      
      this.router.navigate(['/login'],{ replaceUrl: true });
      this.authService.preventBackButton();
      this.authService.logout();
      return false;
    }
    else{        
        if(token != null && this.userInteraction == true ){
            this.authService.refreshToken().subscribe();
            this.userInteraction = false;
        }        
        return true;
    }
  
}
}