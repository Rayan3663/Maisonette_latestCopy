import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonSize } from '@progress/kendo-angular-buttons';
import { SalesTabServiceService } from 'src/app/core/services/SalesContractTab/sales-tab-service.service';
import { AppState } from 'src/app/Ngrx_store/State/app.states';
import { updateSalesDetails } from 'src/app/Ngrx_store/State/SalesTab/sales.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchForm!: FormGroup;
 public bankList:Array<string>=['Item1','Item2','Item3'];
 public defaultItem:string="[Please Select]";
  showmenu = true;
  showResult = false;
  
  searchResults: any[] = [];
  contractId: string | null = null;
  @Output() triggerEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor(private fb: FormBuilder,private router:Router,private route:ActivatedRoute,private sales_service : SalesTabServiceService, private store : Store<AppState>) {}

  ngOnInit() {
    this.contractId = this.route.snapshot.paramMap.get('id');
    console.log('Contract ID:', this.contractId);
    console.log("serach")
    this.searchForm = this.fb.group({
      contractNo: [''],
      unitNumber: [''],
      customers: [''],
      component: [''],
      property: [''],
      status: [''],
      purpose: [''],
      contractDateStart: [''],
      contractDateTo: [''],
      flowVersion: [this.defaultItem],
      stepAny: [this.defaultItem],
      salesAgent: [''],
      broker: [''],
      morgageBank: [this.defaultItem],
      // query:['']
    });
  }
  onView(dataItem: any): void {
   
    if (dataItem && dataItem.contractNo) {
      this.router.navigate(['tabs/contract', dataItem.contractNo], { queryParams: { mode: 'view' } });
    } else {
      console.error('Invalid dataItem.contractNo:', dataItem);
    }
  }

  onEdit(dataItem: any): void {
    console.log('onEdit dataItem:', dataItem); // Debugging line
    if (dataItem && dataItem.contractNo) {
      this.router.navigate(['tabs/contract', dataItem.contractNo], { queryParams: { mode: 'edit' } });
    } else {
      console.error('Invalid dataItem.contractNo:', dataItem);
    }
  }

  menu(): void {
    this.showmenu = true;
    this.showResult = false;
  }

  Results(): void {
    this.showResult = true;
    this.showmenu = false;
  }
  onSearchButtonClick(dataItem: any): void {
    this.ViewByUnitNumber(dataItem.unitNumber);
    this.onView(dataItem);
  }
  
  onSearch(): void {
    console.log(this.searchResults); 
    const formValue = this.searchForm.value;
    this.searchResults = this.sales_service.dummyData.filter(data => data.contractNo === formValue.contractNo);
    this.Results();
    console.log(this.searchResults); 
  }
  EventTriggered() {
    this.triggerEvent.emit('view button clicked');
  }
  ViewByUnitNumber(unitNumber : string){
    console.log(unitNumber)
    let ContractDetails = this.sales_service.SearchByUnitNumber(unitNumber)
    if(ContractDetails != undefined){
       this.store.dispatch(updateSalesDetails({ ContractDetails }))
    }
 
    this.EventTriggered();
  }
}
