import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as myGlobals from 'src/app/globals';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent {
  resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  /**
   * @method buildForm
   * @description Used to create reset form.
   * @return {void}
   */
  buildForm() {
    this.resetForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.pattern(myGlobals.regEx.distributorId)]]
    });
  }

  /**
   * @method submit
   * @description Used to submit reset form.
   * @return {void}
   */
  submit() {
    if (this.resetForm.valid) {
      alert(this.resetForm.value.username);
    }
  }
}
