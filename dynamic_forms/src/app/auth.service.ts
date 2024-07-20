import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse,HttpParams } from '@angular/common/http';
// import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Observable,throwError,BehaviorSubject } from 'rxjs';
import { BodyModule } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { bookIcon } from '@progress/kendo-svg-icons';
import { Location } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'https://localhost:7003';
    private clientId = 'magic';
    private redirectUri = 'http://localhost:4200/callback'; // Your Angular app's redirect URI
    private codeVerifier: string;
    private isValidUser:boolean = false;
    private apiGettokenByAuthCodeUrl = 'https://localhost:7001/api/v1/UsersAuth/code';
    private refreshTokenInProgress = false;
    private timeoutId: any;


    private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    constructor(private http: HttpClient, private router:Router,private location: Location,) {
        // this.configureOAuth();
    }


    getTokenByAuthCode(): Observable<any>{
        
        return this.http.get<any>(window.location.href=this.apiGettokenByAuthCodeUrl);
       
    }   


    // Generate a random code verifier
  private generateCodeVerifier(): string {
    const length = 128;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let verifier = '';
    for (let i = 0; i < length; i++) {
      verifier += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    this.codeVerifier = verifier;
    return verifier;
  }

  // Create a code challenge from the code verifier using SHA-256 hashing
  private async createCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const base64String = btoa(String.fromCharCode.apply(null, hashArray))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return base64String;
  }

  // Initiate the authorization request
  async login(): Promise<void> {
   
    localStorage.setItem('valid_user',"true");
    const codeVerifier = this.generateCodeVerifier();
    localStorage.setItem('code_verifier',codeVerifier)
    const codeChallenge = await this.createCodeChallenge(codeVerifier);

    const authUrl = `${this.apiUrl}/connect/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=openid profile offline_access&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    window.location.href = authUrl;
  }

  // Exchange authorization code for tokens
  exchangeAuthorizationCode(code: string): Observable<any> {
 
    const codeVerifier = localStorage.getItem('code_verifier');

    if (!codeVerifier) {
        throw new Error('Code verifier not found');
      }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });    

    
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', this.clientId);
    body.set('client_secret', 'secret');
    body.set('code_verifier', codeVerifier);
    body.set('code', code);
    body.set('redirect_uri', this.redirectUri);

    return this.http.post<any>(`${this.apiUrl}/connect/token`, body.toString(), { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  
  
  storeTokens(tokens: any): void {
    localStorage.setItem('accessToken', tokens.access_token);
    localStorage.setItem('refreshToken', tokens.refresh_token);
  }

  refreshToken(): Observable<any> {
    // debugger
    

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }
  
    if (this.refreshTokenInProgress) {
      return this.tokenSubject.asObservable();
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });    

    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('client_id', this.clientId) // Replace with your client_id
      .set('refresh_token', refreshToken)
      .set('client_secret', 'secret');

    return this.http.post<any>(`${this.apiUrl}/connect/token`, body, { headers })
      .pipe(
        tap(response => {
          this.storeTokens(response);         
          this.tokenSubject.next(response.access_token);
          this.refreshTokenInProgress = false;
          this.resetTimeout(); 
        })
      );
    
  }
  isTokenExpired(token: string): boolean {
    // Implement token expiration check    
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    
  }

private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.error);
    return throwError('Something bad happened; please try again later.');
  }

  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
    // Implement logout logic, clear token from storage
    this.preventBackButton();
  }
  defaultPage(){
    this.router.navigate(['/tabs/sales']);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  preventBackButton(){
    window.onpopstate = () =>{
      this.location.forward();
    }
  
    setTimeout(()=>{
      this.location.go(this.router.url);
    })
  }


  resetTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    const tokenExpirationTime = 120000; // Example: 2 minutes in milliseconds
    this.timeoutId = setTimeout(() => this.logout(), tokenExpirationTime);
  }


}
