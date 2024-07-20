export interface ContractDetails {
    general: {
      number: string;
      status: string;
      documentStatus: string;
      overseas: boolean;
      legal: boolean;
    };
    unit: {
      unitNo: string;
      unitMarkNo: string;
    };
    mortgage: {
      underMortgage: boolean;
      mortgageBank: string;
    };
    channel: {
      factor: string;
      source: string;
    };
    misc: {
      remarksE: string;
      remarksA: string;
    };
    finance: {
      askingPrice: number;
      options: number;
      modifications: number;
      extraFees: number;
      discounts: number;
      netPrice: number;
      grossPrice: number;
    };
    paymentPlan: {
      cashPrice: number;
      initialPrice: number;
      finalPrice: number;
      finalNPV: number;
      intent: string;
      interestRate: number;
    };
  }
  