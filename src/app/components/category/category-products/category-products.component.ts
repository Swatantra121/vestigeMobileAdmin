import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { _, get } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';
import { ModelBindingService } from 'src/app/services/modelBinding.service';
import { LocalStorageService } from 'src/app/services/local-Storage';
import * as global  from 'src/app/utility/Constant';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  filterForm: FormGroup;
  searchForm: FormGroup;

  currencyList = [{ key: 'INR', value: 'INR' }, { key: 'None', value: null }];
  searchByList = global.PRODUCT_SEARCH_BY;
  productTypeList = []
  inventoryTypeList: Array<any> = global.INVENTORY_TYPE_LIST;
  visibilityList: Array<any> = global.STATUS_LIST;

  isSubmit: boolean = true;
  checked: boolean = false;
  selectedProducts: Array<any> = [];
  checkedArray: Array<any> = [];
  advanceFilterContainer: boolean = false;
  isDesc: boolean = false;
  column: string = '';
  direction: number;
  searchBy: string = '';
  childId: string;
  parentId: string;

  productCatalogue: Array<any> = []

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private modelBindingService: ModelBindingService,
    private localStorage: LocalStorageService,
    private alertService: AlertService) {
    this.parentId = this.route.snapshot.paramMap.get('parentId');
    this.childId = this.route.snapshot.paramMap.get('childId');
    this.localStorage.set('CHILD_ID', this.childId);
    this.localStorage.set('PARENT_ID',this.parentId);
  }

  ngOnInit() {
    this.buildFilterForm();
    this.buildSearchForm();
    this.fetchData()
    
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
    if(this.searchForm.value.search.length > 2 && this.searchForm.value.searchBy ){
      this.getAllProductListing();
      return;
    }
    if(this.searchForm.value.search.length > 0 && this.searchForm.value.searchBy === 'id' ){
      this.getAllProductListing();
      return;
    }
    this.getAllProductListing();    
  }


  fetchData(){
    this.loaderService.isLoading(true);
    this.getAllProductListing();
    this.getProductTypeList();
    this.loaderService.isLoading(false);
    
  }

  formValue() {
    this.categoryService.searchSubCategories(this.childId).subscribe(response => {
      const linkedProduct = this.modelBindingService.mappingDataReturn('productListDecoder', get(response, 'linkedProducts'));
      linkedProduct.forEach(ele => {
        const objIndex = this.productCatalogue.findIndex(obj => obj.skuCode === ele.skuCode);
        if (objIndex >= 0) {
          this.productCatalogue[objIndex].checked = true;
          this.productCatalogue[objIndex].position = ele.position;
          this.selectedProducts.push(this.productCatalogue[objIndex]);
        }
      });
      this.selectedProducts.length <= 0 ? this.isSubmit = true : this.isSubmit = false;
    }, error => {
      this.loaderService.isLoading(false);
      this.alertService.error(error.title);
    })
  }


  getAllProductListing() {
    this.productService.getProductList(this.searchForm.value, this.filterForm.value).subscribe(response => {
      response.forEach(res => {
        if (res.categories) {
          res.categories = res.categories.filter(category =>
            category.categoryId === parseInt(this.childId))
          res.categories = res.categories[0];
        }
      })
      this.productCatalogue = response;
      this.parentId && this.formValue();
    }, error => {
      this.loaderService.isLoading(false);
    })
  }

  getProductTypeList(){
    this.productService.productSetting().subscribe(response => {
      this.productTypeList = response.productTypes;
    },error =>{
      this.loaderService.isLoading(false);            
    });
  }

  addPositionValue(value, skuCode) {
    for (let product of this.selectedProducts) {
      if (product.skuCode === skuCode) {
        product.position = value
      }
    }
  }


  isChecked(checked, product) {
    if (checked.checked) {
      this.isSubmit = false;
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter((check) => {
        return check.skuCode !== product.skuCode
      });
      this.productCatalogue.forEach(element => {
        if (element.id === product.id) {
          element.checked = false;
        }
      });
    }
    this.selectedProducts.length <= 0 ? this.isSubmit = true : this.isSubmit = false;
  }

  saveCategoryProduct() {
    this.loaderService.isLoading(true);
    this.categoryService.linkCategoryToProduct(this.selectedProducts, this.childId).subscribe(response => {
      this.alertService.success(response.message);
      this.loaderService.isLoading(false);
      this.router.navigate(['/catalogue/categories']);
    }, error => {
      this.loaderService.isLoading(false);
      this.alertService.error(error.title);
    })
  }

  selectedAll(event) {
    if (event.checked) {
      this.productCatalogue.forEach(element => {
        element.checked = true;
        this.selectedProducts.push(element);
      });
    } else {
      this.selectedProducts = []
      this.productCatalogue.forEach(element => {
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

  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}
