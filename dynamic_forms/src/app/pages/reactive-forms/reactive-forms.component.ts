import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  DropDownVal!: string;
  DynamicForm!: FormGroup;
  constructor(private fb : FormBuilder){}
  
  ngOnInit(): void {
    this.DynamicForm = this.fb.group({
    })
  }
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

    console.log(this.DynamicForm.value);
    }

    
  



}
