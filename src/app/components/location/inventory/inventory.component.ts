import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { CONFIG_SETTING_LIST, STOCK_MANAGEMENT_LIST } from 'src/app/utility/Constant';
import { LocalStorageService } from '../../../services/local-Storage';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  isPublish: boolean = false;
  locationInventoryForm: FormGroup;
  locationCode: string;
  backOrderList = [];
  configSettingList: Array<any> = CONFIG_SETTING_LIST;
  stockManagementList: Array<any> = STOCK_MANAGEMENT_LIST;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private locationService: LocationService,
    private loaderService: LoaderService
  ) {
    this.locationCode = this.route.snapshot.paramMap.get('locationCode');
    this.localStorage.set('locationCode', this.locationCode);
  }

  ngOnInit() {
    this.buildForm();
    this.getBackOrder();
    if (this.locationCode) {
      this.getInventoryInfo();
    }
  }

  buildForm() {
    this.locationInventoryForm = this.formBuilder.group({
      stockManagement: [''],
      isConfigSettingForBackOrder: [''],
      backOrderStatus: [''],
    });
  }
  getInventoryInfo() {
    this.locationService.getLocationsById(this.locationCode).subscribe(response => {
      if (response.inventoryInfo) {
        this.locationInventoryForm.patchValue(response.inventoryInfo);
      }
    });
  }
  getBackOrder() {
    this.locationService.getBackOrder().subscribe(response => {
      this.backOrderList = response;
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  submit() {
    if (!this.locationInventoryForm.valid) {
      this.alertService.error(null, 'Please fill valid details.');
      return;
    }
    this.loaderService.isLoading(true);
    this.locationService.inventoryRequest(this.locationInventoryForm.value, this.locationCode).subscribe(data => {
      this.alertService.success(null,'Inventory Information has been saved successfully.')
      this.router.navigate([`/location`]);
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
    this.isPublish = true;
  }
  publish() {
    this.loaderService.isLoading(true);
    this.locationService.publishProduct(this.locationCode).subscribe(response => {
      this.loaderService.isLoading(false);
      alert('List has been Published');
    }, error => {
      this.loaderService.isLoading(false);
    });
  }
}
