import { createSelector } from "@ngrx/store";
import { AppState } from "../app.states";
 
export const selectSalesState = (state : AppState) => state.SalesTab
 
//creating a selector
export const selectSalesTabVal = createSelector(
    selectSalesState,
    (state) => state._contractDetails
)