import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-Storage';
import * as myGlobals from 'src/app/globals';
import { ProductService } from 'src/app/services/product.service';
import { STATUS_LIST, VISIBILITY_LIST, UOM_LIST, INVENTORY_TYPE_LIST, VESTIGE_ADMIN_PANEL_ROUTE } from 'src/app/utility/Constant';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  skuCode: string;
  productType;

  productGeneralForm: FormGroup;
  inventoryType: Array<any> = INVENTORY_TYPE_LIST;
  cashOnDeliveryAllowed: Array<any> = STATUS_LIST;
  status: Array<any> = VISIBILITY_LIST;
  isCombinationAllowed: Array<any> = STATUS_LIST;
  allowGiftMessage: Array<any> = STATUS_LIST;
  visibility: Array<any> = STATUS_LIST;
  dynamicKitting: Array<any> = STATUS_LIST;
  uom: Array<any> = UOM_LIST;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  brandList: Array<any> = [];
  productSettingValue;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService : AlertService,
    private localStorage: LocalStorageService,
    private loaderService: LoaderService) {
    this.skuCode = this.route.snapshot.paramMap.get('skuCode');
    this.localStorage.set('skuCode', this.skuCode);
  }

  ngOnInit() {
    this.buildForm();
    this.getBrandListing()
    this.productSettingValue = this.localStorage.get('productSettingValue');
    if (this.skuCode) {
      this.getFormValue();
    }
  }

  buildForm() {
    this.productGeneralForm = this.formBuilder.group({
      productName: ['', Validators.required],
      skuCode: ['', Validators.required],
      inventoryType: ['', Validators.required],
      description: ['', Validators.required],
      shortDescription: ['', Validators.required],
      urlKey: ['',Validators.pattern(myGlobals.regEx.url)],
      isCombinationAvailable: [''],
      validFrom: [''],
      validTo: [''],
      isCodAvailable: [''],
      status: ['', Validators.required],
      isVisibility: ['', Validators.required],
      isAllowGiftMessage: [''],
      primaryVendorCode: [''],
      pv: ['', Validators.required],
      bv: ['', Validators.required],
      color: [''],
      size: [''],
      upcCode: [''],
      weight: ['', Validators.required],
      brand: [''],
      uom: [''],
      width: [''],
      height: [''],
      isDynamicKitting: [''],
    });
    this.loaderService.isLoading(true);
  }

  getBrandListing() {
    this.productService.getBrandList().subscribe(response => {
      this.loaderService.isLoading(false);
      this.brandList = response;
    });
  }

  getFormValue() {
    this.loaderService.isLoading(true);
    this.productService.getProductBySkucode(this.skuCode).subscribe((data) => {
      this.productType = data.productType
      data.generalInformation.validFrom = new Date(data.generalInformation.validFrom);
      data.generalInformation.validTo =  new Date(data.generalInformation.validTo);

      this.productGeneralForm.patchValue(data.generalInformation);
      this.productGeneralForm.controls.skuCode.clearValidators();
      this.productGeneralForm.controls.skuCode.disable()
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  submit() {
 console.log(this.productGeneralForm);
    if (!this.productGeneralForm.valid) {
      this.alertService.error(null,'Please fill valid details.')
      return;
    }


      const request = {
        productType: this.skuCode ? this.productType : this.productSettingValue.productType,
        generalInformation: this.productGeneralForm.value
      }
      request.generalInformation.validFrom = this.productGeneralForm.value.validFrom ? this.productGeneralForm.value.validFrom.toISOString() : '';
      request.generalInformation.validTo = this.productGeneralForm.value.validTo ? this.productGeneralForm.value.validTo.toISOString() : '';

      this.loaderService.isLoading(true);
      if (this.skuCode) {
        request.generalInformation.skuCode = this.skuCode
      }
      this.productService.productRequest(request, this.skuCode ? true : false).subscribe((data) => {
        this.loaderService.isLoading(false);
        this.alertService.success(null, 'General Information has been saved successfully.')
        const SKUCODE = data.generalInformation.skuCode;
        this.localStorage.set('skuCode', SKUCODE);
        this.router.navigate([`/product/${SKUCODE}/price`]);

      }, error => {
        this.loaderService.isLoading(false);
      });

  }
}
