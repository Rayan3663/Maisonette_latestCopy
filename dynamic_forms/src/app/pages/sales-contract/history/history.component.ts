import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  ChangeHistoryGrid1 = [
    { Field: 'Chai', OldValue : 'Sample old value', NewValue: 'Sample New value'},
    { Field: 'Chai', OldValue : 'Sample old value', NewValue: 'Sample New value'},
    { Field: 'Chai', OldValue : 'Sample old value', NewValue: 'Sample New value'},
    { Field: 'Chai', OldValue : 'Sample old value', NewValue: 'Sample New value'},
    { Field: 'Chai', OldValue : 'Sample old value', NewValue: 'Sample New value'},
    { Field: 'Chai', OldValue : 'Sample old value', NewValue: 'Sample New value'}

  ];

   ChangeHistoryGrid2 = [
    { Field: 'Chai', NewValue: 'Sample New value'},
    { Field: 'Chai', NewValue: 'Sample New value'},
    { Field: 'Chai', NewValue: 'Sample New value'},
    { Field: 'Chai', NewValue: 'Sample New value'},
    { Field: 'Chai', NewValue: 'Sample New value'},
    { Field: 'Chai', NewValue: 'Sample New value'}

  ];

  
}
