import { createReducer, on } from "@ngrx/store";
import { ISalesContract } from "src/app/Models/SalesTab/isales-contract";
import { updateSalesDetails } from "./sales.action";
 
 
export interface SalesTabState{
    _contractDetails : ISalesContract
}
//writing intital state
export const InitialSalesState : SalesTabState = {
_contractDetails : {      
UnitNumber : "",
UnitMarkNo : "",
IssueDate : "",
StartDate : "",
DeliveryDate : "",
RevisedDeliveryDate : "",
GracePeriod : 0,
DelayInterest : 0,
Status : "",
Purpose : "",
AskingPrice : 0,
Utilities : 0,
 
//Calculated price in contract tab
InitialPrice : 0
}
}
 
 
//creating a reducer
 
export const SalesTabReducer = createReducer(
    InitialSalesState,
        on(updateSalesDetails, (state, { ContractDetails }) => ({
    ...state,
    _contractDetails: {
      ...state._contractDetails,
      ...ContractDetails
    }
  }))
)
 
 