import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as myGlobals from 'src/app/globals';
import { LoaderService } from 'src/app/services/loader.service';
import { LocationService } from 'src/app/services/location.service';
import { STATUS_LIST } from 'src/app/utility/Constant';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../services/local-Storage';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  customerId;

  responseValue;
  accountInfoValue;
  addressList: Array<any> = [
    { "isDefault": false, "pincode": "110022", "contactName": "vivek ", "lastName": "singh", "company": "Armstrom", "address1": "house No. 8", "address2": "ghandhi colony ", "cityId": 583, "stateId": 10, "countryId": 1, "contactNumber": "8476587987", "gstNumber": "3213165468798", "addressType": "Billing", "cityName": "New Delhi", "stateName": "Delhi", "countryName": "India" },
    { "isDefault": true, "pincode": "334001", "contactName": "vejveihohf", "lastName": "kugbeiug", "company": "iweugu", "address1": "fwbefiuwh`", "address2": "eggwegwegewg", "cityId": 408, "stateId": 29, "countryId": 1, "contactNumber": "9564674698", "gstNumber": "326467987987987", "addressType": "Billing", "cityName": "Bikaner", "stateName": "Rajasthan", "countryName": "India" },
  ]
  showAddAddress = false;
  editIndex = null;

  distributorsAddress: FormGroup;
  countryList: Array<any> = [];
  stateList: Array<any> = [];
  cityList: Array<any> = [];
  statusArray: Array<any> = STATUS_LIST;
  addressTypeList = ['Billing', 'Shipping'];
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private loaderService: LoaderService,
    private localStorage: LocalStorageService,
    private locationService: LocationService) {
    this.customerId = this.route.snapshot.paramMap.get('customerId');
    this.localStorage.set('customerId', this.customerId);
    this.accountInfoValue = this.localStorage.get('CUSTOMER_ACCOUNTINFO_VALUE');
  }

  ngOnInit() {
    this.buildForm();
    this.onChanges();
    this.getCountryList();
  }

  buildForm() {
    this.distributorsAddress = this.formBuilder.group({
      isDefault: [false],
      pincode: [null, [Validators.required, Validators.pattern(myGlobals.regEx.pincode), Validators.maxLength(6)]],
      contactName: [null],
      lastName: [null],
      company: [null],
      address1: [null, Validators.required],
      address2: [null],
      cityId: [null, Validators.required],
      stateId: [null, Validators.required],
      countryId: [null, Validators.required],
      contactNumber: [null, [Validators.required, Validators.pattern(myGlobals.regEx.mobile)]],
      gstNumber: [null],
      addressType: [null, Validators.required],
    });
  }

  addressFunction(action: string, index?) {
    switch (action) {
      case 'add':
        this.showAddAddress = true;
        break;

      case 'edit':
        this.distributorsAddress.patchValue(this.addressList[index]);
        this.editIndex = index;
        this.showAddAddress = true;
        break;

      case 'cancel':
        this.showAddAddress = false;
        this.editIndex = null;
        this.distributorsAddress.reset();
        break;

      case 'delete':
        this.addressList.splice(index, 1);
        break;

      default:
        break;
    }
  }

  isDefaultToggleChnage(event, index) {
    if (event.checked) {
      this.addressList.forEach((element, idx) => {
        if (index != idx) {
          element.isDefault = false
        }
      });
    }
  }

  onChanges(): void {
    this.distributorsAddress.get('pincode').valueChanges.subscribe(pincode => {
      if (pincode && pincode.length === 6) {
        this.loaderService.isLoading(true);
        this.locationService.getCountryStateCity(pincode).subscribe(response => {
          this.responseValue = {
            cityId: response.city.cityId,
            countryId: response.country.countryId,
            stateId: response.state.stateId
          }
          this.getCountryList();
          this.loaderService.isLoading(false);
        },
          error => {
            this.loaderService.isLoading(false);
          });
      }
    });
  }

  getCountryList() {
    this.locationService.getCountryList().subscribe((response) => {
      for (const res of response) {
        if (res.status === true) {
          this.countryList.push(res);
        }
      }
      if (this.responseValue) {
        this.getStateList(this.responseValue.countryId)
      }
    });
  }

  getStateList(countryId) {
    this.loaderService.isLoading(true);
    this.locationService.getStateList(countryId).subscribe(response => {
      this.loaderService.isLoading(false);
      this.stateList = response;
      if (this.responseValue) {
        this.getCityList(this.responseValue.stateId)
      }
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  getCityList(stateId) {
    this.loaderService.isLoading(true);
    this.locationService.getCityList(stateId).subscribe(response => {
      this.loaderService.isLoading(false);
      this.cityList = response;
      if (this.responseValue) {
        this.distributorsAddress.patchValue(this.responseValue);
        this.distributorsAddress.controls.cityId.disable()
        this.distributorsAddress.controls.stateId.disable()
        this.distributorsAddress.controls.countryId.disable()

        this.responseValue = null;
      }
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  saveCustomer() {
    if (this.addressList.length === 0) {
      return;
    }
    this.loaderService.isLoading(true)

    // data manuplition
    const requestValue = this.accountInfoValue
    requestValue.distributorsAddress = JSON.parse(JSON.stringify(this.addressList));
    requestValue.distributorsAddress.forEach(element => {
      element.pincode = { pincode: element.pincode }
    });
    delete requestValue.passwordManagement;
    // requestValue.dob = requestValue.dob.toISOString();
    // requestValue.registrationDate = requestValue.registrationDate.toISOString();



    this.customerService.addcustomer(requestValue).subscribe(response => {
      this.loaderService.isLoading(false)
    }, error => {
      this.loaderService.isLoading(false)
    });
  }

  submit() {

    if (!this.distributorsAddress.valid) {
      return;
    }

    const value = this.distributorsAddress.getRawValue();
    value.cityName = this.cityList.find(ele => ele.cityId == value.cityId).cityName;
    value.stateName = this.stateList.find(ele => ele.stateId == value.stateId).stateName;
    value.countryName = this.countryList.find(ele => ele.countryId == value.countryId).countryName;

    if (this.editIndex !== null) {
      this.addressList[this.editIndex] = value;
      this.editIndex = null;
      this.showAddAddress = false
      this.distributorsAddress.reset()
      return;
    }

    value.isDefault = this.addressList.length == 0 ? true : false
    this.addressList.unshift(value)
    this.showAddAddress = false
    this.distributorsAddress.reset()
  }
}
