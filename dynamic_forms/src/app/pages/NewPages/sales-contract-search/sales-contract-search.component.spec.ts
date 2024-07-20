import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesContractSearchComponent } from './sales-contract-search.component';

describe('SalesContractSearchComponent', () => {
  let component: SalesContractSearchComponent;
  let fixture: ComponentFixture<SalesContractSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesContractSearchComponent]
    });
    fixture = TestBed.createComponent(SalesContractSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
