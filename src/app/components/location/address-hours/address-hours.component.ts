import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { STATUS_LIST, VISIBILITY_LIST, WEEK_DAY_LIST } from 'src/app/utility/Constant';
import { hoursFromList, hoursToList } from 'src/app/utility/Utility';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from 'src/app/services/local-Storage';

import * as myGlobals from 'src/app/globals';


@Component({
  selector: 'app-address-hours',
  templateUrl: './address-hours.component.html',
  styleUrls: ['./address-hours.component.css']
})
export class AddressHoursComponent implements OnInit {
  locationAddressHoursForm: FormGroup;
  lunchTime: FormArray;
  weekDayName: Array<any> = WEEK_DAY_LIST;
  statusArray: Array<any> = STATUS_LIST;
  visibilityArray: Array<any> = VISIBILITY_LIST;
  cityList: Array<any> = [];
  stateList: Array<any> = [];
  countryList: Array<any> = [];
  hoursFrom: Array<any> = [];
  selected = 'hello';
  storeHours: Array<any> = [];
  showLoader: boolean = false;
  locationCode: string;
  responseValue;

  constructor(private formBuilder: FormBuilder,
    private locationService: LocationService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private loaderService: LoaderService) {
    this.hoursFrom = hoursFromList();
    this.locationCode = this.route.snapshot.paramMap.get('locationCode');
    this.localStorage.set('locationCode', this.locationCode);

  }

  ngOnInit() {
    this.buildForm();
    if (this.locationCode) {
      this.getAddressInfo();
    }
    this.onChanges();
  }

  buildForm() {
    this.locationAddressHoursForm = this.formBuilder.group({
      houseNo: ['', Validators.required],
      society: [''],
      pincode: ['', [Validators.required, Validators.pattern(myGlobals.regEx.pincode), Validators.maxLength(6)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(myGlobals.regEx.mobile)]],
      email: ['', [Validators.pattern(myGlobals.regEx.email)]],
      days: this.formBuilder.array(this.createTimeTable())
    });
  }

  getAddressInfo() {
    this.loaderService.isLoading(true);
    this.locationService.getLocationsById(this.locationCode).subscribe(response => {
      if (response.addressInfo) {

        response.addressInfo.city = response.addressInfo.city.cityId
        response.addressInfo.country = response.addressInfo.country.countryId
        response.addressInfo.state = response.addressInfo.state.stateId

        let days =[]
        response.addressInfo.days.forEach(element => {
          element.IsActive = true;
          const index = this.weekDayName.findIndex(ele => Object.keys(element)[0] == ele.value)
          if (index >= 0) {
            this.onCheckBoxChange({ checked: true }, this.locationAddressHoursForm.controls.days['controls'][index], Object.keys(element)[0])
          }
          days[index] = element
        });
        response.addressInfo.days = days;

        this.responseValue = response.addressInfo
      }
      this.getCountryList();
      this.loaderService.isLoading(false);

    }, error => {
      this.loaderService.isLoading(false);

    });
  }

  onChanges(): void {
    this.locationAddressHoursForm.get('pincode').valueChanges.subscribe(pincode => {
      if (pincode.length === 6) {
        this.loaderService.isLoading(true);
        this.locationService.getCountryStateCity(pincode).subscribe(response => {
          this.responseValue = {
            city: response.city.cityId,
            country: response.country.countryId,
            state: response.state.stateId
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

  onCheckBoxChange(event, formGroup, formGroupName) {
    if (event.checked) {
      formGroup.controls[formGroupName].controls.hoursFrom.enable();
      formGroup.controls[formGroupName].controls.hoursTo.enable();
    } else {
      formGroup.controls[formGroupName].controls.hoursFrom.reset();
      formGroup.controls[formGroupName].controls.hoursTo.reset();
      formGroup.controls[formGroupName].controls.hoursFrom.disable();
      formGroup.controls[formGroupName].controls.hoursTo.disable();
    }
  }

  createTimeTable() {
    const weekDayArray = [];
    for (let i = 0; i < this.weekDayName.length; i++) {
      const fieldName = this.weekDayName[i].value;
      const field = this.formBuilder.group({
        IsActive: new FormControl(false),
        [fieldName]: this.daysFormGroup()
      });
      weekDayArray.push(field);
    }
    return weekDayArray;
  }

  daysFormGroup(): FormGroup {
    return this.formBuilder.group({
      hoursFrom: new FormControl({ value: null, disabled: true }, Validators.required),
      hoursTo: new FormControl({ value: null, disabled: true }, Validators.required),
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
        this.getStateList(this.responseValue.country)
      }
    });
  }

  getStateList(countryId) {
    this.loaderService.isLoading(true);
    this.locationService.getStateList(countryId).subscribe(response => {
      this.loaderService.isLoading(false);
      this.stateList = response;
      if (this.responseValue) {
        this.getCityList(this.responseValue.state)
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
        this.locationAddressHoursForm.patchValue(this.responseValue);
        this.responseValue = null;
      }
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  submit() {
    if (!this.locationAddressHoursForm.valid) {
      this.alertService.error(null,'Please fill valid details.');     
      return;
    }

    const value = this.locationAddressHoursForm.value;


    value.country = this.countryList.find(ele => ele.countryId == value.country)
    value.city = this.cityList.find(ele => ele.cityId == value.city)
    value.state = this.stateList.find(ele => ele.stateId == value.state)

    let error = false;
    value.days = value.days.filter(function (element) { return element.IsActive }).map(element => {
        // console.log(element);
      delete element.IsActive;
      return element;
    });

    this.loaderService.isLoading(true);
    this.locationService.addressInfoRequest(this.locationAddressHoursForm.value, this.locationCode).subscribe(data => {
      this.alertService.success(null,'Address and Hours detail has been saved successfully.')
      this.router.navigate([`/location/${this.locationCode}/location-inventory`]);
      this.loaderService.isLoading(false);
    }, error => {
      this.alertService.error(null)
      this.loaderService.isLoading(false);
    });

  }
}
