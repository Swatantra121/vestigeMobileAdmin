import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { STATUS_LIST, VISIBILITY_LIST } from 'src/app/utility/Constant';
import { LocalStorageService } from 'src/app/services/local-Storage';
import * as myGlobals from 'src/app/globals';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';
// import { ModelBindingService } from '../../../services/modelBinding.service';

// import * as Constant from '../../utility/constant/Constant';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  locationInfoForm: FormGroup;
  public statusArray: Array<any> = STATUS_LIST;
  public visibilityArray: Array<any> = VISIBILITY_LIST;
  fulfillmentType: Array<any> = [];
  availableCheckout: Array<any> = [
    'Not available',
    'Pickup at store only',
    'Shipping only'
  ];
  storeViewSelection: Array<any> = [];
  customerGroupSelection: Array<any> = [];
  locationCode: string;
  locationInfo: any;
  isPublish: boolean = false;
  locationInfoResponse;
  constructor(private formBuilder: FormBuilder,
    private locationService: LocationService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private alertService: AlertService) {
    this.locationCode = this.route.snapshot.paramMap.get('locationCode');
    this.localStorage.set('locationCode', this.locationCode);
  }

  ngOnInit() {
    this.buildForm();
    this.getWareHouseTypesList();
    this.getCustomerGroupSelectionList();
    this.getStoreViewSelectionList();
    if (this.locationCode) {
      this.getLocationInfo();
    }
  }

  buildForm() {
    this.locationInfoForm = this.formBuilder.group({
      locationName: ['', Validators.required],
      locationCode: ['', Validators.required],
      orderOfDisplay: ['', Validators.required],
      isWarehouseEnabled: ['', Validators.required],
      fulfillmentType: [''],
      availableInCheckout: [''],
      storeViewSelection: ['', Validators.required],
      customerGroupSelection: ['', Validators.required],
      isVisibleOnCmsPage: [''],
      isVisibleOnProductPage: [''],
    });
  }

  getLocationInfo() {
    this.locationService.getLocationsById(this.locationCode).subscribe(response => {
      if (response.locationInfo) {
        this.locationInfoForm.patchValue(response.locationInfo);
      }
    });
  }

  getWareHouseTypesList() {
    this.loaderService.isLoading(true);
    this.locationService.getWarehouseTypes().subscribe(response => {
      this.fulfillmentType = response;
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  getCustomerGroupSelectionList() {
    this.loaderService.isLoading(true);
    this.locationService.getCustomerGroupSelection().subscribe(response => {
      this.customerGroupSelection = response
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  getStoreViewSelectionList() {
    this.loaderService.isLoading(true);
    this.locationService.getStoreViewSelection().subscribe(response => {
      this.storeViewSelection = response;
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
  }


  submit() {
    if (!this.locationInfoForm.valid) {
      this.alertService.error(null,'Please fill valid details.');            
      return;
    }
    this.loaderService.isLoading(true);

    if (this.locationCode) {
      this.locationService.locationInfoRequest(this.locationInfoForm.value, this.locationCode).subscribe((data) => {
      this.alertService.success(null,'Location Information has been saved successfully.')
      this.loaderService.isLoading(false);
        this.localStorage.set('locationId', data.locationInfo.locationCode);
        this.router.navigate([`/location/${data.locationInfo.locationCode}/location-address`]);
      }, error => {
      this.alertService.error(null)
      this.loaderService.isLoading(false);
      });
    } else {
      this.locationService.locationInfoRequest(this.locationInfoForm.value).subscribe((data) => {
      this.alertService.success(null,'Location Information has been saved successfully.')
      this.loaderService.isLoading(false);
        this.localStorage.set('locationCode', data.locationInfo.locationCode);
        console.log(data.locationInfo.locationCode);
        this.router.navigate([`/location/${data.locationInfo.locationCode}/location-address`]);
      }, error => {
      this.alertService.error(null)
      this.loaderService.isLoading(false);
      });
    }

  }
  publish() {
    this.isPublish = false;
  }
}
