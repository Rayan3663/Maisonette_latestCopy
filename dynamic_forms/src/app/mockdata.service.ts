// src/app/mock-data.service.ts

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class MockDataService implements InMemoryDbService {

  createDb() {
    const gridData = [
      { id: 1, amount: 50, description: 'Installment', type: 'Reservation', interestRate: 5, status: 'Active' },
      { id: 2, amount: 200, description: 'Installment', type: 'Normal', interestRate: 7, status: 'Active' },
      { id: 3, amount: 600, description: 'Installment', type: 'Reservation', interestRate: 8, status: 'Pending' }
    ];
    return { gridData };
  }

}
