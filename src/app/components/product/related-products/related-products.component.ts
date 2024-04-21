import { Component, OnInit } from '@angular/core';
import { _ } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductListModel } from 'src/app/models/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ModelBindingService } from 'src/app/services/modelBinding.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from '../../../services/local-Storage';
import * as global from 'src/app/utility/Constant';
import { AlertService } from 'src/app/services/alert.service';
import { element } from 'protractor';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit {

  skuCode: string;
  filterForm: FormGroup;
  searchForm: FormGroup;

  //Dropdown lists
  currencyList = [{ key: 'INR', value: 'INR' }, { key: 'None', value: null }];
  searchByList = global.PRODUCT_SEARCH_BY;
  productTypeList = []
  inventoryTypeList: Array<any> = global.INVENTORY_TYPE_LIST;
  visibilityList: Array<any> = global.STATUS_LIST;

  isSubmit: boolean = true;
  checked: boolean = false;
  selectedProducts: Array<any> = [];
  advanceFilterContainer: boolean = false;
  isDesc: boolean = false;
  column: string = '';
  direction: number;
  public relatedProductList: Array<any> = [];
  public showLoader = false;
  isAllSelected = false;
  constructor(public router: Router,
    public productService: ProductService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    public authService: AuthService,
    public loaderService: LoaderService) {
    this.skuCode = this.route.snapshot.paramMap.get('skuCode');
    this.localStorage.set('skuCode', this.skuCode);
  }

  ngOnInit() {
    this.buildFilterForm();
    this.buildSearchForm();
    this.getProductList();
    this.getProductTypeList();

  }

  buildFilterForm() {
    this.filterForm = this.formBuilder.group({
      offerPriceFrom: [null],
      offerPriceTo: [null],
      currency: [null],
      idFrom: [null],
      idTo: [null],
      productType: [null],
      inventoryType: [null],
      isVisibility: [null],
      WnsFrom: [null],
      WnsTo: [null],
    })
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: [''],
      searchBy: [null],
    })
  }

  searchProduct() {
    if (this.searchForm.value.search.length >= 3 && this.searchForm.value.searchBy) {
      this.getProductList();
      return;
    }
    if (this.searchForm.value.search.length > 0 && this.searchForm.value.searchBy === 'id') {
      this.getProductList();
      return;
    }
    this.getProductList();
  }

  getProductList() {
    this.loaderService.isLoading(true);
    this.productService.getProductList(this.searchForm.value, this.filterForm.value).subscribe(response => {
      this.loaderService.isLoading(false);
      this.relatedProductList = response.filter(element => element.skuCode !== this.skuCode).map(x => Object.assign({}, x));
      if (this.skuCode) {
        this.getFormValue();
      }
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  getProductTypeList() {
    this.loaderService.isLoading(true);
    this.productService.productSetting().subscribe(response => {
      this.loaderService.isLoading(false);
      this.productTypeList = response.productTypes;
    }, error => {
      this.loaderService.isLoading(false);
    });
  }


  getFormValue() {
    this.loaderService.isLoading(true);
    this.productService.getProductBySkucode(this.skuCode).subscribe((data) => {
      if (data.relatedProducts) {
        data.relatedProducts.forEach(ele => {
          const objIndex = this.relatedProductList.findIndex(obj => obj.skuCode === ele.skuCode);
          if (objIndex >= 0) {
            this.relatedProductList[objIndex].checked = true;
            this.relatedProductList[objIndex].position = ele.position;
            this.selectedProducts.push(this.relatedProductList[objIndex]);
          }
        });
      }
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  isChecked(checked, product) {
    if (checked.checked) {
      this.isSubmit = false;
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter((check) => {
        return check.skuCode !== product.skuCode;
      });
      this.relatedProductList.forEach(element => {
        if (element.skuCode === product.skuCode) {
          element.checked = false;
        }
      });
    }
    this.selectedProducts.length <= 0 ? this.isSubmit = true : this.isSubmit = false;
  }

  addPositionValue(value, skuCode) {
    for (let product of this.selectedProducts) {
      if (product.skuCode === skuCode) {
        product.position = value
      }
    }
  }

  selectedAll(event) {
    if (event.checked) {
      this.relatedProductList.forEach(element => {
        element.checked = true;
        this.selectedProducts.push(element);
      });
    } else {
      this.selectedProducts = []
      this.relatedProductList.forEach(element => {
        element.checked = false;
      });
    }
  }

  showAdvanceFilter(advanceFilter) {
    if (!advanceFilter) {
      this.filterForm.reset();
    }
    this.advanceFilterContainer = advanceFilter;
  }

  routeTo() {
    this.router.navigate(['/product/up-sells']);
  }

  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  saveRelatedProducts() {
    this.loaderService.isLoading(true);

    let error = false;
    this.selectedProducts.forEach(element => {
      if (!element.position && element.position == 0 && element.position == '') {
        this.alertService.error(null, "Positon can't be Zero or blank.");
        error = true;
      }
    })
    if (error) {
      this.loaderService.isLoading(false);
      return;
    }

    this.productService.addRelatedProduct(this.selectedProducts, this.skuCode)
      .subscribe((data) => {
        this.loaderService.isLoading(false);
        this.alertService.success(null, 'Related Product has been saved successfully.')
        this.router.navigate([`/product/${this.skuCode}/up-sells`]);
      }, error => {
        this.alertService.error(null)
        this.loaderService.isLoading(false);
      },
    );
  }
}
