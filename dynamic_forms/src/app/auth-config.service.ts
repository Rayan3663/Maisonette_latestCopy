// // src/app/auth-config.service.ts
// import { Injectable } from '@angular/core';
// import { StsConfigLoader } from 'angular-auth-oidc-client';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthConfigService implements StsConfigLoader {

//   getConfiguration(): Promise<any> {
//     return Promise.resolve({
//       authority: 'https://your-oidc-provider.com',
//       client_id: 'your-client-id',
//       redirect_uri: window.location.origin,
//       post_logout_redirect_uri: window.location.origin,
//       response_type: 'code',
//       scope: 'openid profile email',
//       showDebugInformation: true,
//     });
//   }
// }
