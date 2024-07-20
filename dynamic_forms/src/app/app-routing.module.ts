import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesMainComponent } from './pages/sales-contract/sales-main/sales-main.component';
import { ContractComponent } from './pages/sales-contract/contract/contract.component';
import { InstallmentComponent } from './pages/sales-contract/installment/installment.component';
import { LoginComponent } from './pages/login/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { CallbackComponent } from './callback.component';
import { AuthGuard } from './AuthGuard';
import { HistoryComponent } from './pages/sales-contract/history/history.component';

const routes: Routes = [
  //  { path: '', redirectTo: 'sales', pathMatch: 'full' },
  // {
  //   path: 'sales', component: SalesMainComponent, children: [
  //     { path: 'contract', component: ContractComponent },
  //     { path: 'installment', component: InstallmentComponent },
  //     // { path: '', redirectTo: 'general', pathMatch: 'full' }
  //   ]
  // },
  
];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'tabs/contract/:id', component: ContractComponent },
    { path: 'tabs/installment', component: InstallmentComponent },
    { path: 'tabs/sales', component: SalesMainComponent,canActivate: [AuthGuard] },
    {path:'login', component:LoginComponent},
    {path:'tabs/search', component:SearchComponent},
    { path: 'callback', component: CallbackComponent },
    {path:'history',component:HistoryComponent}
    // {
    //   path: 'tabs/sales', component: SalesMainComponent, children: [
    //     { path: 'search', component: SearchComponent },
    //     { path: 'contract', component: ContractComponent },
    //     { path: 'installment', component: InstallmentComponent },
    //     { path: '', redirectTo: 'search', pathMatch: 'full' }
    //   ]
    // },
    // { path: '', redirectTo: '/tabs/sales', pathMatch: 'full' },
    // {path:'login',component:LoginComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
