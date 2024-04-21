import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { ProductService } from 'src/app/services/product.service';
import { LocationService } from 'src/app/services/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-Storage';
import * as myGlobals from 'src/app/globals';
import { TAX_CATEGORY_LIST } from 'src/app/utility/Constant';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  skuCode: string;

  productPriceForm: FormGroup;
  minDate = new Date();
  maxDate = new Date(2020, 0, 1);
  customerGroupSelection: Array<any> = [];
  taxCategory: Array<any> = TAX_CATEGORY_LIST;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private alertService : AlertService,
    private localStorage: LocalStorageService,
    private locationService: LocationService,
    private loaderService: LoaderService,
    private route: ActivatedRoute) {
    this.skuCode = this.route.snapshot.paramMap.get('skuCode');
    this.localStorage.set('skuCode', this.skuCode);
  }

  ngOnInit() {
    this.buildForm();
    this.getCustomerGroupSelectionList();
    this.getFormValue();
  }

  buildForm() {
    this.productPriceForm = this.formBuilder.group({
      mrp: ['', Validators.required],
      offerPrice: [''],
      baseCost: ['', Validators.pattern('[1-9][0-9]*|0')],
      offerPriceValidFrom: [''],
      offerPriceValidTo: [''],
      taxClass: ['', Validators.required],
      manufactureSuggestedPrice: [''],
      groupPrice: this.formBuilder.array([this.createGroupArray()]),
      tierPrice: this.formBuilder.array([this.createTierArray()])
    });
  }

  getFormValue() {

    this.loaderService.isLoading(true);
    this.productService.getProductBySkucode(this.skuCode).subscribe((data) => {

      if (data.priceInformation) {
       
        for (let i = 0; i < data.priceInformation.groupPrice.length - 1; i++) {
          this.addGroupPrice();
        }

        for (let i = 0; i < data.priceInformation.tierPrice.length - 1; i++) {
          this.addTierPrice();
        }

        data.priceInformation.offerPriceValidFrom = new Date(data.priceInformation.offerPriceValidFrom)
        data.priceInformation.offerPriceValidTo = new Date(data.priceInformation.offerPriceValidTo)
        

        this.productPriceForm.patchValue(data.priceInformation);
      }
      this.loaderService.isLoading(false);
      
    }, error => {
      this.loaderService.isLoading(false);

    });
  }

  createGroupArray(): FormGroup {
    return this.formBuilder.group({
      customerGroup: '',
      price: '',
    });
  }

  createTierArray(): FormGroup {
    return this.formBuilder.group({
      customerGroup: '',
      quantity: '',
      price: '',
    });
  }

  addGroupPrice(): void {
    const formField = <FormArray>this.productPriceForm.controls['groupPrice']
    formField.push(this.createGroupArray());
  }

  addTierPrice(): void {
    const formField = <FormArray>this.productPriceForm.controls['tierPrice']
    formField.push(this.createTierArray());
  }

  deleteGroupPrice(i) {
    const formField = <FormArray>this.productPriceForm.controls['groupPrice']
    formField.removeAt(i)
  }

  deleteTierPrice(i) {
    const formField = <FormArray>this.productPriceForm.controls['tierPrice']
    formField.removeAt(i)
  }

  getCustomerGroupSelectionList() {
    this.loaderService.isLoading(true);
    this.locationService.getCustomerGroupSelection().subscribe(response => {
      this.loaderService.isLoading(false);
      this.customerGroupSelection = response;
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  saveProductPriceInformation() {

console.log(this.productPriceForm.valid); 
    

    if (!this.productPriceForm.valid) {
      this.alertService.error(null,'Please fill valid details.')      
      return;
    }

    const value = this.productPriceForm.value
    value.offerPriceValidFrom = value.offerPriceValidFrom ? value.offerPriceValidFrom.toISOString() : '';
    value.offerPriceValidTo = value.offerPriceValidTo ? value.offerPriceValidTo.toISOString() : '';

    this.loaderService.isLoading(true);
    this.productService.addProductPrice(value, this.skuCode)
      .subscribe((data) => {
        this.loaderService.isLoading(false);
        this.alertService.success(null, 'Prices has been saved successfully.')        
        this.router.navigate([`/product/${this.skuCode}/images`]);
      }, error => {
        this.loaderService.isLoading(false);
        this.alertService.error(null)        
        
      },
    );
  }

}
