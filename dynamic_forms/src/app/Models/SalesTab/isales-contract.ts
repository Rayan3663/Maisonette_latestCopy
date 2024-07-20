export interface ISalesContract {  
    UnitNumber : string,
    UnitMarkNo : string,
    IssueDate : string,
    StartDate : string,
    DeliveryDate : string,
    RevisedDeliveryDate : string,
    GracePeriod : number,
    DelayInterest : number,
    Status : string,
    Purpose : string,
    AskingPrice : number,
    Utilities : number,
     
    //Calculated price in contract tab
    InitialPrice : number
    }