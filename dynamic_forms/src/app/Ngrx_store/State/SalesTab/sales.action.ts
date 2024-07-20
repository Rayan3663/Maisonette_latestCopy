import { createAction, props } from "@ngrx/store";
import { ISalesContract } from "src/app/Models/SalesTab/isales-contract";
 
 
export const updateSalesDetails = createAction(
  '[SalesTab] Sales Contract Details',
  props<{ ContractDetails: Partial<ISalesContract> }>()
);