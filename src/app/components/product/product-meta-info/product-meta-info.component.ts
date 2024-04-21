import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from '../../../services/local-Storage';

@Component({
  selector: 'app-product-meta-info',
  templateUrl: './product-meta-info.component.html',
  styleUrls: ['./product-meta-info.component.css']
})
export class ProductMetaInfoComponent implements OnInit {

  skuCode: string;

  productMetaInfo: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private loaderService: LoaderService,
    private router: Router) {
    this.skuCode = this.route.snapshot.paramMap.get('skuCode');
    this.localStorage.set('skuCode', this.skuCode);
  }

  ngOnInit() {
    this.buildForm();
    this.getFormValue();
  }

  buildForm() {
    this.productMetaInfo = this.formBuilder.group({
      title: [null],
      description: [null],
      keywords: [null],
    });
  }

  getFormValue() {
    this.loaderService.isLoading(true);
    this.productService.getProductBySkucode(this.skuCode).subscribe((data) => {
      if (data.metaInformation) {
        this.productMetaInfo.patchValue(data.metaInformation);
      }
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);

    });
  }

  saveProductMetaInformation() {
    if (this.productMetaInfo.value.title && this.productMetaInfo.value.description && this.productMetaInfo.value.keywords) {
      this.loaderService.isLoading(true);
      this.productService.addMetaInformation(this.productMetaInfo.value, this.skuCode)
        .subscribe((data) => {
          this.alertService.success(null, 'Meta information has been saved successfully.')
          this.loaderService.isLoading(false);
          this.router.navigate([`/product/${this.skuCode}/inventory`]);
        },
          error => {
            this.alertService.error(null)
            this.loaderService.isLoading(false);
            console.log(error);
            this.alertService.error(error.title);
          });
    }else {
      this.alertService.error(null,'Please fill valid details.')      
    }
  }

  onSkip() {
    this.router.navigate([`/product/${this.skuCode}/inventory`]);
  }
}
