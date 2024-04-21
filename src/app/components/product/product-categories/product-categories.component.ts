import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-Storage';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {
  searchForm: FormGroup;

  // data: any;
  searchByList = [{ key: 'None', value: null },
  { key: 'Id', value: 'id' },
  { key: 'Name', value: 'name' }];

  categoryList: Array<any> = [];
  productCatagory: boolean = true;
  productCategoryList: Array<any> = [];
  createProductCategories: boolean = true;
  skuCode: string;
  constructor(private categoryService: CategoryService,
    public productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private localStorage: LocalStorageService) {
    this.skuCode = this.route.snapshot.paramMap.get('skuCode');
    this.localStorage.set('skuCode', this.skuCode);
  }

  ngOnInit() {
    this.buildSearchForm();
    this.getAllCategoryListing();
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: [''],
      searchBy: [null],
    })
  }

  searchCategoryList() {
    if (this.searchForm.value.search.length >= 3 && this.searchForm.value.searchBy === 'name') {
      this.getSearchResult();
      return;
    }
    if (this.searchForm.value.search.length > 0 && this.searchForm.value.searchBy === 'id') {
      this.getSearchResult();
      return;
    }
    this.getAllCategoryListing();
  }

  getSearchResult() {
    this.loaderService.isLoading(true);
    this.categoryService.searchCategories(this.searchForm.value.searchBy, this.searchForm.value.search).subscribe(response => {
      this.loaderService.isLoading(false);
      this.categoryList = response;
    }, error => {
      this.loaderService.isLoading(false);
      this.categoryList = [];
      // this.alertService.error(error.title)
    });
  }

  /**
   * @function getAllCategoryListing
   * @returns {void}
   * @description get all category listing
   */
  getAllCategoryListing() {
    this.loaderService.isLoading(true);
    this.categoryService.getCategoryList(0, null).subscribe(response => {
      this.loaderService.isLoading(false);
      this.categoryList = response;
      this.alreadyAddedCatagory(this.categoryList);
    }, error => {
      this.loaderService.isLoading(false);
    })
  }

  alreadyAddedCatagory(category) {
    category.forEach(element => {
      element.linkedProducts.length > 0 &&
        element.linkedProducts.forEach(item => item.skuCode === this.skuCode && (element.checked = true))
      element.subCategotList.length > 0 && this.alreadyAddedCatagory(element.subCategotList)
    });
  }

  submit() {
    this.loaderService.isLoading(true);
    this.productService.addProductCategories(this.skuCode).subscribe(response => {
      this.loaderService.isLoading(false);
      this.router.navigate([`/product/${this.skuCode}/related-products`]);
    }, error => {
      this.loaderService.isLoading(false)
      this.alertService.error(error.title);
    })
  }
}
