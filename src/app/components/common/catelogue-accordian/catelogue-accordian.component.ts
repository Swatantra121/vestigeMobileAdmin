import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-catelogue-accordian',
  templateUrl: './catelogue-accordian.component.html',
  styleUrls: ['./catelogue-accordian.component.css']
})
export class CatelogueAccordianComponent implements OnInit {

  @Input() data: any;
  @Input() productCategory: string;
  @Input() catagoryCatalogue: any;
  @Output() valueChange = new EventEmitter();

  categoryList: Array<any> = [];
  productCategoryList: Array<any> = [];

  constructor(private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private loaderService: LoaderService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.categoryList = this.data;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.categoryList = changes.data.currentValue;
  }

  createSubCategories(id) { // You can give any function name
    this.valueChange.emit(id);
  }

  editCategory(parentId, childId) {
    this.router.navigate([`category/${childId}/${parentId}/category-information`]);
  }

  createSubCategory(childId) {
    this.router.navigate([`category/${childId}/category-information`]);
  }

  selectCategory(checked, category, id) {
    if (checked.checked === true) {
      const object = this.selectCategoryWithoutSubCategory(category, ['subCategotList'])
      this.productService.productCategories.push(object)
    } else {
      this.productService.productCategories = this.productService.productCategories.filter(product => {
        return product.childId !== id
      })
    }
  }

  selectCategoryWithoutSubCategory(catagory, key) {
    const category = {};
    for (var i in catagory) {
      if (key.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(catagory, i))
        continue;
      category[i] = catagory[i];
    }
    return category;
  }

  publishCategory(childId) {
    this.loaderService.isLoading(true);
    this.categoryService.publishCategory(childId).subscribe(response => {
      this.loaderService.isLoading(false);
      if (response) {
        this.categoryService.getCategoryList(0).subscribe(response => this.categoryList = response,
          error => this.loaderService.isLoading(false));
        alert('Category has been Published')
      }
    }, error => {
      this.loaderService.isLoading(false);
      this.alertService.error(error.title);
    })
  }

  expandData(id) {
    this.categoryList.filter(category => {
      category.childId === id && (
        category.expand === true ? category.expand = false : category.expand = true
      )
    })
  }
}
