import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ISalesContract } from 'src/app/Models/SalesTab/isales-contract';
import { AppState } from 'src/app/Ngrx_store/State/app.states';
import { updateSalesDetails } from 'src/app/Ngrx_store/State/SalesTab/sales.action';
import { selectSalesTabVal } from 'src/app/Ngrx_store/State/SalesTab/sales.selector';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  contractDetailsForm!: FormGroup;
  utilitiesDataToDisplay: any[] = [];
  initialUtilitiesData: any[] = [];
  mode: string = 'view'; 

  utilitiesData = [
    { number: 1, utilityType: 'Electricity', calc: 'Fixed', price: 100, start: '2023-01-01', end: '2023-12-31', termsPlan: 'Annual', contractType: 'Standard' }
  ];
  salesAgentsData = [];
  
  ContractInfo$ : ISalesContract;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.select(selectSalesTabVal).subscribe(
      res => {
        this.ContractInfo$ = res
      }
    )
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'view'; 
      this.setFormMode();
    });

    this.contractDetailsForm = this.fb.group({
      general: this.fb.group({
        number: [{ value:this.ContractInfo$.UnitNumber, disabled: this.mode === 'view' }],
        status: [{ value: this.ContractInfo$.Status, disabled: this.mode === 'view' }],
        documentStatus: [{ value: '', disabled: this.mode === 'view' }],
        overseas: [{ value: true, disabled: this.mode === 'view' }],
        legal: [{ value: true, disabled: this.mode === 'view' }],
        contNo: [{ value: '', disabled: this.mode === 'view' }],
        purpose: [{ value: this.ContractInfo$.Purpose, disabled: this.mode === 'view' }],
        interest: [{ value: '', disabled: this.mode === 'view' }],
        discount: [{ value: '', disabled: this.mode === 'view' }]
      }),
      dates: this.fb.group({
        issueDate: [{ value:this.ContractInfo$.IssueDate, disabled: this.mode === 'view' }],
        deliveryDate: [{ value:this.ContractInfo$.DeliveryDate, disabled: this.mode === 'view' }],
        revisedDeliveryDate: [{ value: this.ContractInfo$.RevisedDeliveryDate, disabled: this.mode === 'view' }],
        commissionDate: [{ value: '', disabled: this.mode === 'view' }],
        startDate: [{ value: this.ContractInfo$.StartDate, disabled: this.mode === 'view' }],
        gracePeriod: [{ value: this.ContractInfo$.GracePeriod, disabled: this.mode === 'view' }],
        delayInterest: [{ value: this.ContractInfo$.DelayInterest, disabled: this.mode === 'view' }]
      }),
      unit: this.fb.group({
        unitNo: [{ value: this.ContractInfo$.UnitNumber, disabled: this.mode === 'view' }],
        unitMarkNo: [{ value: this.ContractInfo$.UnitMarkNo, disabled: this.mode === 'view' }],
        bookingNo: [{ value: '', disabled: this.mode === 'view' }],
        bookingFees: [{ value: '', disabled: this.mode === 'view' }]
      }),
      mortgage: this.fb.group({
        underMortgage: [{ value: true, disabled: this.mode === 'view' }],
        mortgageBank: [{ value: '', disabled: this.mode === 'view'  }] 
      }),
      channel: this.fb.group({
        factor: [{ value: '', disabled: this.mode === 'view' }],
        source: [{ value: '', disabled: this.mode === 'view' }]
      }),
      misc: this.fb.group({
        remarksE: [{ value: '', disabled: this.mode === 'view' }],
  remarksA: [{ value: '', disabled: this.mode === 'view' }]
      }),
      finance: this.fb.group({
        askingPrice: [{ value: this.ContractInfo$.AskingPrice, disabled: this.mode === 'view' }],
        egp: [{ value: '', disabled: this.mode === 'view' }],
        options: [{ value: '', disabled: this.mode === 'view' }],
        modifications: [{ value: '', disabled: this.mode === 'view' }],
        comm: [{ value: '', disabled: this.mode === 'view' }],
        com1: [{ value: '', disabled: this.mode === 'view' }],
        com2: [{ value: '', disabled: this.mode === 'view' }],
        minAskPrice: [{ value: '', disabled: this.mode === 'view' }],
        extraFees: [{ value: '', disabled: this.mode === 'view' }],
        initialPrice: [{ value: this.ContractInfo$.InitialPrice, disabled: this.mode === 'view' }],
        dis: [{ value: '', disabled: this.mode === 'view' }],
        per: [{ value: '', disabled: this.mode === 'view' }],
        net: [{ value: '', disabled: this.mode === 'view' }],
        util: [{ value: '', disabled: this.mode === 'view' }],
        gross: [{ value: '', disabled: this.mode === 'view' }]
      })
    });

   
    this.contractDetailsForm.get('unit.unitNo')?.valueChanges.subscribe(value => {
      this.updateUtilitiesTable(value);
    });

 
  }
  ngOnDestroy(): void {
    const updatedContractDetails = {
   ...this.ContractInfo$, 
   InitialPrice: this.contractDetailsForm.get('finance.initialPrice')?.value,
 };
     let ContractDetails = updatedContractDetails
     if(ContractDetails != undefined){
        this.store.dispatch(updateSalesDetails({ ContractDetails }))
     }
   }
  updateUtilitiesTable(unitNo: string) {
    if (unitNo === 'SW-0112-00-00-LX') {
      this.utilitiesDataToDisplay = this.utilitiesData;
    } else {
      this.utilitiesDataToDisplay = this.initialUtilitiesData;
    }
  }


  setFormMode() {
    console.log('Current mode:', this.mode);
    
  //   const miscGroup = this.contractDetailsForm.get('misc');
  //   if (miscGroup) {
  //     const remarksAControl = miscGroup.get('remarksA');
  //     if (remarksAControl) {
  //       if (this.mode === 'view') {
  //         remarksAControl.disable(); 
  //       } else if (this.mode === 'edit') {
  //         this.contractDetailsForm.enable(); 
  //         remarksAControl.enable();
  //     } else {
  //       console.error('remarksA control not found in misc group');
  //     }
  //   } else {
  //     console.error('misc group not found in form');
  //   }
  // }
  
}
}

