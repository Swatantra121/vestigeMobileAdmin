import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { ProductService } from 'src/app/services/product.service';
import * as constant from 'src/app/utility/Constant';
import * as myGlobals from 'src/app/globals'
import { LocalStorageService } from '../../../services/local-Storage';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  addAccountInfoForm: FormGroup;
  customerId;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  // dropDown Lists
  associateWebsite;
  groupList = ['General', 'Wholesale', 'Retailer'];
  distributorParentList = []
  genderList = ['Male', 'Female']
  titleList = ['Mr.', 'Mrs.', 'Dr.', 'Ms.']
  distributorStatusList = [{ key: 'Yes', value: '1' }, { key: 'No', value: '0' }]

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private customerService :CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService,
    private loaderService: LoaderService) {
    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.localStorage.set('customerId', this.customerId);
  }

  ngOnInit() {
    this.buildForm();
    this.getAssociatedWebsite();
    this.getDistributorParentList()
    if (!this.customerId) {
      const accountInfoValue = this.localStorage.get('CUSTOMER_ACCOUNTINFO_VALUE')
      if (accountInfoValue) {
        this.addAccountInfoForm.patchValue(accountInfoValue);
      }
    }
  }


  buildForm() {
    this.addAccountInfoForm = this.formBuilder.group({
      gender: [null],
      emailId: [null, [Validators.required, Validators.pattern(myGlobals.regEx.email)]],
      mobileNumber: [null, [Validators.required, Validators.pattern(myGlobals.regEx.mobile)]],
      dob: [null],
      distributorId: [null, [Validators.required, Validators.pattern(myGlobals.regEx.distributorId)]],
      status: [null],
      uplineDistributorId: [null],
      deviceToken: [null],
      minFirstPurchaseAmount:[null,Validators.required],
      source: [null],
      panNumber:[null,Validators.required],
      gstNo: [null, [Validators.required, Validators.pattern(myGlobals.regEx.gstNumber)]],
      associateWebsite: [null, Validators.required],
      registrationDate: [null],
      group: [null, Validators.required],
      title: [null],
      firstName: [null, [Validators.required,Validators.maxLength(50)]],
      lastName: [null, [Validators.required,Validators.maxLength(50)]],
      customerEmail: [null, Validators.pattern(myGlobals.regEx.email)],
      passwordManagement: this.formBuilder.group({
        adminPassword: [null, Validators.required],
        newPassword: [null],
        autoGeneratePassword: [null],
      })
      // distributorParentEmail: [null,Validators.pattern(myGlobals.regEx.email)],
    });
  }


  getDistributorParentList(){
    this.loaderService.isLoading(true);
    this.customerService.getDistributorParentList().subscribe(response => {
      if(response){
      this.distributorParentList = response;
    }
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  getAssociatedWebsite() {
    this.loaderService.isLoading(true);
    this.productService.productSetting().subscribe(response => {
      this.loaderService.isLoading(false);
      this.associateWebsite = response.associateToWebSite;
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  submit() {
    // console.log(JSON.stringify(this.addAccountInfoForm.value))
    console.log(this.addAccountInfoForm.value)
    if (!this.addAccountInfoForm.valid) {
      return;
    }
    this.localStorage.set('CUSTOMER_ACCOUNTINFO_VALUE', this.addAccountInfoForm.value);
    this.router.navigate(['/customer/addresses']);
  }
}