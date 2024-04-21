import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  customerInfoForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.customerInfoForm = this.formBuilder.group({
      loggedIn: [''],
      email: [''],
      createdOn: [''],
      billingAddress: [''],
      createdIn: [''],
      customerGroup: ['']
    });
  }

  submit(){
    
  }
}
