import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstallmentComponent } from '../installment/installment.component';
import { SalesTabServiceService } from 'src/app/core/services/SalesContractTab/sales-tab-service.service';
 
@Component({
  selector: 'app-sales-main',
  templateUrl: './sales-main.component.html',
  styleUrls: ['./sales-main.component.css']
})
export class SalesMainComponent {
  actionForm!: FormGroup;
  displaySearchComponent = false;
  displayContractComponent=false;
  displayInstallmentComponent=false;
  displayHistory=false;
  defaultSelection = '--Select--'
  option: string;
  options: string[] = ['Add Record','Delete Record'];

  constructor(private fb: FormBuilder,private router:Router, private service : SalesTabServiceService) {}

   setDefaultDropDown(){
    this.option = this.defaultSelection
  }

  ngOnInit()
  {
   
    this.actionForm = this.fb.group({
      actionDropdown:[this.option]
  });
}
//   showSearchComponent() {
//     this.displaySearchComponent = true;
//     this.displayContractComponent=false;
//     this.displayInstallmentComponent=false;
//     this.displayHistory=false;
//   }
//   showContractComponent()
//   {
// this.displayContractComponent=true;
// this.displaySearchComponent = false;
// this.displayInstallmentComponent=false;
// this.displayHistory=false;
//   }
//   showInstallmentComponent()
//   {
//     this.displayInstallmentComponent=true;
//     this.displayContractComponent=false;
//     this.displaySearchComponent = false;
//     this.displayHistory=false;
//   }
//   showHistory()
//   {
//     this.displayHistory=true;
//     this.displayInstallmentComponent=false;
//     this.displayContractComponent=false;
//     this.displaySearchComponent = false;
//   }
showSearchComponent() {
  this.router.navigate(['tabs/search']);
 
  // this.searchEventTriggered(res:any);
}
 
showContractComponent() {
  this.router.navigate(['tabs/contract/:id']);
}
 
showInstallmentComponent() {
  this.router.navigate(['tabs/installment']);
}
 
showHistory() {
  this.router.navigate(['/history']);
}
  saveData() {
 
    console.log('Data saved successfully (simulated).');
    alert('Data saved successfully (simulated).');
  }
  searchEventTriggered(res : string){
    this.showContractComponent()
  }

  //delete record
  GetDropDownSelectedValue(event : any){
      if(event == 'Delete Record'){
          this.service.DeleteSelectedRows();
          this.setDefaultDropDown()
      }
  } 
 
}