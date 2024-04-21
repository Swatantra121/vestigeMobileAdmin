import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from '../../../services/local-Storage';

@Component({
  selector: 'app-product-setting',
  templateUrl: './product-setting.component.html',
  styleUrls: ['./product-setting.component.css']
})
export class ProductSettingComponent implements OnInit {

  productSettingForm: FormGroup;
  productTypeData: Array<any> = [];
  showLoader: boolean = false;
  associateWebsite: Array<any> = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private localStorage: LocalStorageService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.buildForm();
    this.getProductSetting();
  }

  buildForm() {
    this.productSettingForm = this.formBuilder.group({
      associateWebsite: ['', Validators.required],
      productType: ['', Validators.required],
    });
  }

  getProductSetting() {
    this.loaderService.isLoading(true);
    this.productService.productSetting().subscribe(response => {
      this.loaderService.isLoading(false);  
      this.associateWebsite = response.associateToWebSite;
      this.productTypeData = response.productTypes;
    },error =>{
      this.loaderService.isLoading(false);            
    });
  }

  saveProduct() {
    if (this.productSettingForm.valid) {
      console.log(this.productSettingForm.value)
      this.localStorage.set('productSettingValue', this.productSettingForm.value);
      this.router.navigate(['\product/general']);
    }
  }
}
