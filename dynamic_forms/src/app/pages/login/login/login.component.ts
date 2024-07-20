import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/auth.config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {AuthService} from 'src/app/auth.service'
import { emailValidator, maxLengthValidator, minLengthValidator, passwordValidator, validationMessages } from 'src/app/Validation';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       userId: ['', Validators.required],
//       password: ['', Validators.required],
//       rememberMe: [false], 
//     });
//   }
 
//   togglePasswordVisibility() {
//     const passwordField = document.getElementById('password-field') as HTMLInputElement;
//     passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//         const loginData = new HttpParams()
//             .set('client_id', 'm2m.client')
//             .set('client_secret', 'SuperSecretPassword')
//             .set('grant_type', 'client_credentials')
//             .set('scope', 'weatherapi.read');

//         this.http.post('https://localhost:7024/connect/token', loginData.toString(), {
//             headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
//         }).subscribe({
//             next: (response: any) => {
//                 console.log('Authentication successful', response);
//                 localStorage.setItem('authToken', response.access_token);
//                 this.router.navigate(['/form']);
//             },
//             error: (error) => {
//                 this.errorMessage = 'Invalid username or password';
//                 console.error('Authentication failed', error);
//             }
//         });
//     }
// }
loginForm!: FormGroup;
  errorMessage: string = '';
  submitted = false;
checkErr=false;
showRem=false;

constructor(
  private fb: FormBuilder,
  private router: Router,
  private http: HttpClient,
  private authservice:AuthService
) {}
Token: any;
data:any;
ngOnInit(): void {
   
  this.loginForm = this.fb.group({
    userId: [
      '',
      [
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(20)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ]
    ],
    rememberMe: [false],
  });
}
get f(): { [key: string]: AbstractControl } {
  return this.loginForm.controls;
}
togglePasswordVisibility() {
  const passwordField = document.getElementById('password-field') as HTMLInputElement;
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}
onSubmit() {
  this.submitted = true;
  if (this.loginForm.invalid) {
    this.checkErr=true;
    return;
  }
  this.checkErr=false;
  this.router.navigate(['/tabs/search']);

  // this.authService.getCode().subscribe({
  //   next: (response: any) => {
  //     window.location.href = response.url; 
  //   },
  //   error: (error) => {
  //     this.errorMessage = 'Error initiating authentication';
  //     console.error('Error:', error);
  //   }
  // });
  this.authservice.login();
}


// onSubmit() {
//   debugger
//   this.formSubmitted = true;  // Set the flag to true upon submission
//   // if (this.loginForm.invalid) {
//   //   this.loginForm.markAllAsTouched(); // Mark all fields as touched to show errors
//   //   return;
//   // }

//   // const loginData = new HttpParams()
//   //   .set('client_id', 'm2m.client')
//   //   .set('client_secret', 'SuperSecretPassword')
//   //   .set('grant_type', 'client_credentials')
//   //   .set('scope', 'weatherapi.read');
  
  
  
//   this.authservice.login();

// // this.authservice.getTokenByAuthCode().subscribe({
// //   next: (response: any) => {
// //     debugger
// //     console.log('Authentication successful', response);
// //     localStorage.setItem('authToken', response.access_token);
   
// //   }
// // });


//   // this.http.post('https://localhost:7001/api/v1/UsersAuth/code', {   
//   //   accept: '*/*'
//   // }).subscribe({
//   //   next: (response: any) => {
//   //     console.log('Authentication successful', response);
//   //     localStorage.setItem('authToken', response.access_token);
//   //     this.router.navigate(['/form']);
//   //   },
//   //   error: (error) => {
//   //     this.errorMessage = 'Invalid username or password';
//   //     console.error('Authentication failed', error);
//   //   }
//   // });
// }
  }
  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const userId = this.loginForm.get('userId')?.value;
  //     const password = this.loginForm.get('password')?.value;

  //     if (userId === 'admin' && password === 'password') {
  //       this.router.navigate(['/form']);
  //       // this.authenticate();
  //     } else {
  //       this.errorMessage = 'Invalid username or password';
  //     }
  //   }
  // }

    // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const { username, password } = this.loginForm.value;
  //     if (username === this.hardcodedUsername && password === this.hardcodedPassword) {
  //       console.log('Login successful');
  //       this.router.navigate(['/menu']);
  //     } else {
  //       console.error('Login failed: Invalid credentials');
  //       this.oidcSecurityService.authorize();
  //     }
  //   }
  // loginForm!: FormGroup;
  // hardcodedUsername = 'testuser';
  // hardcodedPassword = 'testpassword';

  // constructor(
  //   private fb: FormBuilder,
  //   private router: Router,
  //   private oidcSecurityService: OidcSecurityService
  // ) { }

  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  //   this.oidcSecurityService.checkAuth().subscribe((loginResponse: any) => {
  //     const { isAuthenticated, userData, accessToken, idToken, configId } = loginResponse;
  //     console.log('Is authenticated:', isAuthenticated);
  //     console.log('User data:', userData);
  //     console.log('Access token:', accessToken);
  //     console.log('ID token:', idToken);
  //     console.log('Config ID:', configId);
  //   });
  // }
  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const { username, password } = this.loginForm.value;
  //     if (username === this.hardcodedUsername && password === this.hardcodedPassword) {
  //       console.log('Login successful');
  //       this.router.navigate(['/menu']);
  //     } else {
  //       console.error('Login failed: Invalid credentials');
  //       this.oidcSecurityService.authorize();  
  //     }
  //   }
  // }

  // login() {
  //   this.oidcSecurityService.authorize();
  // }

  // logout() {
  //   this.oidcSecurityService.logoff().subscribe(result => console.log(result));
  // }







  // loginForm!: FormGroup;
  // hardcodedUsername = 'testuser';
  // hardcodedPassword = 'testpassword';

  // constructor(
  //   private fb: FormBuilder,
  //   private router: Router,
  //   private oidcSecurityService: OidcSecurityService
  // ) { }

  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });

  //   this.oidcSecurityService.checkAuth().subscribe((loginResponse: any) => {
  //     const { isAuthenticated, redirectUrl,userData, accessToken, idToken, configId } = loginResponse;
  //     // console.log('Redirect Url:', redirectUrl);
  //     console.log('Is authenticated:', isAuthenticated);
  //     console.log('User data:', userData);
  //     console.log('Access token:', accessToken);
  //     console.log('ID token:', idToken);
  //     console.log('Config ID:', configId);
  //   });
  // }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const { username, password } = this.loginForm.value;
  //     if (username === this.hardcodedUsername && password === this.hardcodedPassword) {
  //       console.log('Login successful');
  //       this.router.navigate(['/menu']);
  //     } else {
  //       console.error('Login failed: Invalid credentials');
  //       this.oidcSecurityService.authorize();  
  //     }
  //   }
  // }

  




  
  // login() {
  //   this.oidcSecurityService.authorize();
  // }

  // logout() {
  //   this.oidcSecurityService.logoff().subscribe(result => console.log(result));
  // }
























































  // loginForm!: FormGroup;
  // hardcodedUsername = 'testuser';
  // hardcodedPassword = 'testpassword';

  // // private oidcSecurityService: OidcSecurityService,
  // constructor(
  //   private fb: FormBuilder,
  //   private router: Router
  // ) { }

  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const { username, password } = this.loginForm.value;
  //     if (username === this.hardcodedUsername && password === this.hardcodedPassword) {
     
  //       console.log('Login successful');
       
  //       this.router.navigate(['/menu']);
  //     } else {
  //       console.error('Login failed: Invalid credentials');
       
  //     }
  //   }
  // }





