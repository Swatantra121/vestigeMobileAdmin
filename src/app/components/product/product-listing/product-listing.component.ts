import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductListModel } from 'src/app/models/Product';
import { LoaderService } from 'src/app/services/loader.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as global from 'src/app/utility/Constant';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  // Forms
  filterForm: FormGroup;
  searchForm: FormGroup;

  // Dropdown lists
  currencyList = [{ key: 'INR', value: 'INR' }, { key: 'None', value: null }];
  actionList = [{ key: 'Delete', value: 'delete' }, { key: 'Change Status', value: 'ChangeStatus' }];
  searchByList = global.PRODUCT_SEARCH_BY;
  productTypeList = [];
  inventoryTypeList: Array<any> = global.INVENTORY_TYPE_LIST;
  visibilityList: Array<any> = global.STATUS_LIST;

  checked: boolean = false;
  selectedArray: Array<any> = [];
  advanceFilterContainer: boolean = false;
  isDesc: boolean = false;
  column: string = '';
  direction: number;
  checkedAll: false;
  isAllSelected = false;
  public productList: Array<any> = [];
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private productService: ProductService) { }

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
    });
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: [''],
      searchBy: [this.searchByList[0].value],
    });
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


  actionFunction(action) {
    const skuCodeArray = this.selectedArray.map(function (el) { return el.skuCode; });
    switch (action) {
      case 'delete':
        this.deleteProduct(skuCodeArray);
        break;
      case 'ChangeStatus':
        this.changeProductStatus(skuCodeArray);
        break;
      default:
    }
    this.selectedArray = [];
  }

  getProductList() {
    this.loaderService.isLoading(true);
    this.productService.getProductList(this.searchForm.value, this.filterForm.value).subscribe(response => {
      this.productList = response;
      this.loaderService.isLoading(false);
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

  selectedAll() {
    this.productList.forEach(element => {
      element.checked = this.isAllSelected;
    });
  }

  routeTo() {
    this.router.navigate(['product/setting']);
  }

  publishProduct(skucode) {
    this.loaderService.isLoading(true);
    this.productService.getProductBySkucode(skucode).subscribe(response => {
      if (response.generalInformation && response.priceInformation && response.images && response.inventory && response.categories) {
        this.productService.publishProduct(skucode).subscribe(res => {
          if (res) {
            this.getProductList();
            this.alertService.success('product_publish');
          }
        }, error => {

        });
      } else {
        this.alertService.error('mandatory_failed');
      }
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  isChecked(checked, product) {
    if (checked.checked === true) {
      this.selectedArray.push(product);
    } else {
      this.selectedArray = this.selectedArray.filter((element) => {
        return element.skuCode !== product.skuCode;
      });
    }
  }

  showAdvanceFilter(advanceFilter) {
    if (!advanceFilter) {
      this.filterForm.reset();
    }
    this.advanceFilterContainer = advanceFilter;
  }

  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  editProduct(skuCode) {
    this.router.navigate([`product/${skuCode}/general`]);
  }

  deleteProduct(skuCodeArray) {
    this.loaderService.isLoading(true);
    this.productService.deleteProduct(skuCodeArray).subscribe(response => {
      this.alertService.success('product_deleted');
      this.getProductList();
      this.loaderService.isLoading(false);
    }, error => {
      this.alertService.error('deleted_failed');
      this.loaderService.isLoading(false);
    });
  }

  changeProductStatus(skuCodeArray) {
    this.loaderService.isLoading(true);
    this.productService.changeProductStatus(skuCodeArray).subscribe(response => {
      this.getProductList();
      this.alertService.success('product_status_changed');
      this.loaderService.isLoading(false);
    }, error => {
      this.alertService.error('fwef');
      this.loaderService.isLoading(false);
    });
  }
}
