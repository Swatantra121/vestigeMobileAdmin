import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { VESTIGE_ADMIN_PANEL_ROUTE } from 'src/app/utility/Constant';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from 'src/app/services/local-Storage';
import { STORAGE_KEYS } from 'src/app/globals';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  searchForm: FormGroup;


  // data: any;
  categoryList: Array<any> = [];
  searchByList = [{ key: 'None', value: null },
  { key: 'Id', value: 'id' },
  { key: 'Name', value: 'name' }];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.buildSearchForm();
    this.getCategoryList();
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: [''],
      searchBy: [null],
    })
  }

  /**
   * @function getCategoryList
   * @returns {void}
   * @description get all category listing
   */
  getCategoryList() {
    this.loaderService.isLoading(true);
    this.categoryService.getCategoryList(0, this.searchForm.value).subscribe(response => {
      this.loaderService.isLoading(false);
      this.categoryList = response;
    }, error => {
      this.loaderService.isLoading(false);
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
    this.getCategoryList();
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
   * @function createCategory
   * @returns {void}
   * @description route to category-information page
   */
  createCategory() {
    this.router.navigate(['category/category-information']);
  }

  createSubCategory(childId) {
    this.router.navigate([`category/${childId}/category-information`]);
  }

}
