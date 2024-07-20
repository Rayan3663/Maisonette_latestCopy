import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://localhost:7003', 
    redirectUri: window.location.origin + '/callback',
    clientId: '"m2m.client', 
    responseType: 'code',
    scope: 'weatherapi.read',
    showDebugInformation: true
};
