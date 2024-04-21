import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LocalStorageService } from 'src/app/services/local-Storage';
import * as myGlobals from 'src/app/globals';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  showLoader = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService,
    public alertService: AlertService,
    private loaderService: LoaderService) {
    this.buildForm();
  }


  /**
   * @method buildForm
   * @return {void}
   * @description Used to create login form.
   */
  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: [null],
      password: [null, Validators.required]
    });
  }

  /**
   * @method submit
   * @return {void}
   * @description Used to submit login form.
   */
  submit() {
    debugger
    if (this.loginForm.valid) {
      this.showLoader = true;
      this.authService.login(this.loginForm.value)
        .subscribe((data) => {
          this.localStorage.set(myGlobals.STORAGE_KEYS.TOKEN_KEY, data.access_token);
          this.localStorage.set(myGlobals.STORAGE_KEYS.DISTRIBUTOR_ID_KEY, data);
          this.showLoader = false;
          this.router.navigate(['\dashboard']);
        },
          error => {
            this.alertService.error('login_failed');
            this.showLoader = false;
          });
    }
  }
}
