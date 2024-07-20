import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Installments, Utilities } from 'src/app/Models/SalesTab/InstallmentTabModel';
import { ISalesContract } from 'src/app/Models/SalesTab/isales-contract';

 
@Injectable({
  providedIn: 'root'
})
export class SalesTabServiceService {
 
  constructor() { }
 
  //static data
 
  dummyData: any[] = [
    {
      contractNo: '001',
      unitNumber: 'U001',
      customers: 'Customer A',
      component: 'Component X',
      property: 'Property 1',
      status: 'Active',
      purpose: 'Purpose A',
      contractDateStart: '2023-01-01',
      contractDateTo: '2023-12-31',
      flowVersion: '1.0',
      stepAny: 'Step 1',
      salesAgent: 'Agent A',
      broker: 'Broker A',
      morgageBank: 'Bank A',
      issueDate: '2023-01-01',
      unitMark: 'Mark A',
      amount: '1000'
    },
    {
      contractNo: '001',
      unitNumber: 'U002',
      customers: 'Customer B',
      component: 'Component Y',
      property: 'Property 2',
      status: 'Inactive',
      purpose: 'Purpose B',
      contractDateStart: '2023-02-01',
      contractDateTo: '2023-11-30',
      flowVersion: '1.1',
      stepAny: 'Step 2',
      salesAgent: 'Agent B',
      broker: 'Broker B',
      morgageBank: 'Bank B',
      issueDate: '2023-02-01',
      unitMark: 'Mark B',
      amount: '2000'
    },
    {
      contractNo: '001',
      unitNumber: 'U003',
      customers: 'Customer C',
      component: 'Component Z',
      property: 'Property 3',
      status: 'Pending',
      purpose: 'Purpose C',
      contractDateStart: '2023-03-01',
      contractDateTo: '2023-10-31',
      flowVersion: '1.2',
      stepAny: 'Step 3',
      salesAgent: 'Agent C',
      broker: 'Broker C',
      morgageBank: 'Bank C',
      issueDate: '2023-03-01',
      unitMark: 'Mark C',
      amount: '3000'
    },
    {
      contractNo: '001',
      unitNumber: 'U004',
      customers: 'Customer D',
      component: 'Component W',
      property: 'Property 4',
      status: 'Completed',
      purpose: 'Purpose D',
      contractDateStart: '2023-04-01',
      contractDateTo: '2023-09-30',
      flowVersion: '1.3',
      stepAny: 'Step 4',
      salesAgent: 'Agent D',
      broker: 'Broker D',
      morgageBank: 'Bank A',
      issueDate: '2023-04-01',
      unitMark: 'Mark D',
      amount: '4000'
    },
   
  ];
 
  //static contract data for testing
  SalesContractData : ISalesContract[] = [
    {
        UnitNumber: 'U001',
        UnitMarkNo: 'Mark A',
        IssueDate: '2023-01-01',
        StartDate: '2023-01-01',
        DeliveryDate: '2023-12-31',
        RevisedDeliveryDate: '2023-12-31',
        GracePeriod: 1,
        DelayInterest: 2,
        Status: 'Active',
        Purpose: 'Purpose A',
        AskingPrice: 1000,
        Utilities: 300,
        InitialPrice: 0
  },
      {
        UnitNumber: 'U002',
        UnitMarkNo: 'Mark B',
        IssueDate: '2023-02-01',
        StartDate: '2023-02-01',
        DeliveryDate: '2023-11-30',
        RevisedDeliveryDate: '2023-11-30',
        GracePeriod: 1,
        DelayInterest: 2,
        Status: 'Active',
        Purpose: 'Purpose B',
        AskingPrice: 2000,
        Utilities: 200,
        InitialPrice: 0
  }
]
 
SearchByUnitNumber(unitNumber : string){
    return this.SalesContractData.find(u => u.UnitNumber == unitNumber)
}

//Installment Tab static data
InstallmentsDataStore : Installments[] = [
      { SlNo: 1, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Percentage:99, Type: 'Delivery', Amount : 300, CashValue : 215, selected: false },
      { SlNo: 2, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Percentage:99, Type: 'Delivery', Amount : 300, CashValue : 215, selected: false },
      { SlNo: 3, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Percentage:99, Type: 'Delivery', Amount : 300, CashValue : 215, selected: false },
      { SlNo: 4, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Percentage:99, Type: 'Delivery', Amount : 300, CashValue : 215, selected: false },
      { SlNo: 5, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Percentage:99, Type: 'Delivery', Amount : 300, CashValue : 215, selected: false },
      { SlNo: 6, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Percentage:99, Type: 'Delivery', Amount : 300, CashValue : 215, selected: false }
]


UtilitisDataStore : Utilities[] = [
      { SlNo: 1, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Amount : 300, selected: false },
      { SlNo: 2, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Amount : 300, selected: false },
      { SlNo: 3, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Amount : 300, selected: false },
      { SlNo: 4, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Amount : 300, selected: false },
      { SlNo: 5, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Amount : 300, selected: false },
      { SlNo: 6, Date : "01-01-2018", Description_English : 'Sample Description', Description_Arabic: 'Sample Description', Amount : 300, selected: false }
]

//to delete selected records

booleanSubject = new BehaviorSubject<boolean>(false);

DeleteSelectedRows(){
  console.log("service for deleting called")
  this.booleanSubject.next(true);
}
 
}