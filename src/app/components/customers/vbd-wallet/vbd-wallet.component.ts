import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vbd-wallet',
  templateUrl: './vbd-wallet.component.html',
  styleUrls: ['./vbd-wallet.component.css']
})
export class VbdWalletComponent implements OnInit {
  vbdWalletForm: FormGroup;

  advanceFilterContainer = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.vbdWalletForm = this.formBuilder.group({
      creditBalance: [''],
      creditValue: [''],
      comment: [''],
    });
  }

  submit() {

  }

  showAdvanceFilter(flag) {

  }
}
