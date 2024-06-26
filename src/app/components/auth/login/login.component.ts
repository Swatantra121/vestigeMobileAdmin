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
  submit(): void {
    if (this.loginForm.valid) {
      this.showLoader = true;
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          this.handleSuccessfulLogin(data);
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }
  private handleSuccessfulLogin(data: any): void {
    this.localStorage.set(myGlobals.STORAGE_KEYS.TOKEN_KEY, data.access_token);
    // Assuming data contains the distributor ID as a separate property
    this.localStorage.set(myGlobals.STORAGE_KEYS.DISTRIBUTOR_ID_KEY, data.distributor_id);
    this.showLoader = false;
    this.router.navigate(['/dashboard']);
  }
  private handleError(error: any): void {
    // Log error or send it to a monitoring service
    console.error('Login error:', error);
    this.alertService.error('login_failed');
    this.showLoader = false;
  }
}
