import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonSize } from '@progress/kendo-angular-buttons';
import { PagerPosition, PagerType } from '@progress/kendo-angular-grid';
import { SalesTabServiceService } from 'src/app/core/services/SalesContractTab/sales-tab-service.service';
import { Installments, Utilities } from 'src/app/Models/SalesTab/InstallmentTabModel';
import { ISalesContract } from 'src/app/Models/SalesTab/isales-contract';
import { AppState } from 'src/app/Ngrx_store/State/app.states';
import { selectSalesTabVal } from 'src/app/Ngrx_store/State/SalesTab/sales.selector';

 
 
@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.css']
})
export class InstallmentComponent implements OnInit {
DropDownVal!: string;
DynamicForm!: FormGroup;
 
public size: ButtonSize = "none";
 
  public pagerTypes = ["numeric", "input"];
  public type: PagerType = "numeric";
  public buttonCount = 5;
  public info = true;
  public pageSizes = [2, 5, 10, 20];
  public previousNext = true;
  public position: PagerPosition = "bottom";
  public pageSize = 5;
  public skip = 0;

  //static data variables for grid 
  public utilityData: Utilities[] = this.service.UtilitisDataStore;
  public installmentData: Installments[] = this.service.InstallmentsDataStore;
 
  ContractInfo$ : ISalesContract

  constructor(private fb : FormBuilder, private store : Store<AppState>, private service : SalesTabServiceService){}
 
  ngOnInit(): void {

    //ngRx store access
    this.store.select(selectSalesTabVal).subscribe(
      res => {
        this.ContractInfo$ = res
      }
    )
    
    //service for deleting selected rows
    this.service.booleanSubject.subscribe(
        (res) =>{
          console.log(res)
          if(res){
            this.removeSelectedRows()
          }
        }
    )

 
    this.DynamicForm = this.fb.group({
      CashPrice : [0, Validators.required],
      InitialPrice : [this.ContractInfo$.InitialPrice, Validators.required],
      InitialNPV : [0, Validators.required],
      FinalPrice : [0, Validators.required],
      FinalNPV : [0, Validators.required],
      Plan : ['', Validators.required],
      Intent : [false, Validators.required], // radio button label,
      InterestRate : ['', Validators.required],
      AsOfDate : [this.ContractInfo$.IssueDate],
    })
  }

    //static values for dropdown
    
    InterestRateDropDown = [10, 12, 15, 18]
    PlanDropDown = ["Plan 1", "Plan 2", "Plan 3", "Plan 4"]
    MoreOptionDropDown = ["Option 1", "Option 2", "Option 3"]
    getDropDownValue(event : any){
         this.DropDownVal = event.target.value;
        //  debugger;
        this.changeFields();
    }
 
    changeFields(){
      // debugger;
      if (this.DropDownVal === 'Finance1') {
        console.log("1st");
      this.DynamicForm.addControl('dynamicField1', new FormControl(''));
    } else if (this.DropDownVal === 'Finance2') {
      console.log("2nd");
      this.DynamicForm.addControl('dynamicField2', new FormControl(''));
    }
  }
 

  // logic for tab switching for kendo grid  
  currentBtnTab: string = 'Installments';
 
  MenuTabClicked(BtnClicked: string) {
    this.currentBtnTab = BtnClicked;
  }
 
 
  // Deleting the row functionality:

  onCheckboxChange(event: any, dataItem: any): void {
    dataItem.selected = event.target.checked;
    console.log(dataItem)
  }

  removeSelectedRows(): void {
    console.log("clicked")
    this.installmentData = this.service.InstallmentsDataStore.filter(item => !item.selected)
    this.utilityData = this.service.UtilitisDataStore.filter(item => !item.selected);
     
    this.service.booleanSubject.next(false)
    console.log(this.installmentData)

  }
 
 
}
 