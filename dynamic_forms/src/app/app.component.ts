import { Component, inject, OnInit } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { InteractionService } from './interaction.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private interactionService: InteractionService, 
              private router:Router, private authService:AuthService) { }

  ngOnInit() {
    
    this.authService.resetTimeout();
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

    this.interactionService.init();
  }
  
}
