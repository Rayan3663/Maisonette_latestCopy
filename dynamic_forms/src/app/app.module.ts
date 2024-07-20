import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsComponent } from './pages/reactive-forms/reactive-forms.component';
import { LoginComponent } from './pages/login/login/login.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UploadModule } from '@progress/kendo-angular-upload';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { AuthInterceptor, AuthModule, LogLevel, StsConfigLoader } from 'angular-auth-oidc-client';

import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { RouterModule, Routes } from '@angular/router';
import { authConfig } from './auth.config';
import { environment } from './environment';
import { SalesMainComponent } from './pages/sales-contract/sales-main/sales-main.component';
import { ContractComponent } from './pages/sales-contract/contract/contract.component';
import { InstallmentComponent } from './pages/sales-contract/installment/installment.component';
import { SalesContractSearchComponent } from './pages/NewPages/sales-contract-search/sales-contract-search.component';
import { SearchComponent } from './pages/search/search.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from "@progress/kendo-angular-inputs";
import { AuthInterceptorClass } from './auth-interceptor.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './AuthGuard';
import { HistoryComponent } from './pages/sales-contract/history/history.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SalesTabReducer } from './Ngrx_store/State/SalesTab/sales.reducer';
import { IconsModule } from '@progress/kendo-angular-icons';



@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormsComponent,
    LoginComponent,
    SalesMainComponent,
    ContractComponent,
    InstallmentComponent,
    SalesContractSearchComponent,
    SearchComponent,
    HistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    DropDownsModule,
    BrowserAnimationsModule,
    UploadModule,
    ButtonsModule,
    DialogsModule,
    DropDownsModule,
    TooltipModule ,
    InputsModule,
    GridModule,
    HttpClientModule  ,
    DateInputsModule,
    IconsModule,
    StoreModule.forRoot({SalesTab : SalesTabReducer}),
    StoreDevtoolsModule.instrument({
      maxAge : 25
    }),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:4200'],
        sendAccessToken: true,
      },
    }),
    ButtonsModule,
  ],
  providers: [   
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorClass,
      multi: true
    },    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
