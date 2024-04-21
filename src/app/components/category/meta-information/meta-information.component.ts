import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';
import { LocalStorageService } from 'src/app/services/local-Storage';

@Component({
  selector: 'app-meta-information',
  templateUrl: './meta-information.component.html',
  styleUrls: ['./meta-information.component.css']
})

export class MetaInformationComponent implements OnInit {
  categoryMetaInformationForm: FormGroup;
  childId: string;
  parentId: string;
  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private router: Router) {
    this.parentId = this.route.snapshot.paramMap.get('parentId');
    this.childId = this.route.snapshot.paramMap.get('childId');
    this.localStorage.set('CHILD_ID', this.childId);
    this.localStorage.set('PARENT_ID',this.parentId);
  }

  ngOnInit() {
    this.buildForm();
    this.parentId && this.formValue();
  }

  formValue() {
    this.loaderService.isLoading(true);
    this.categoryService.searchSubCategories(this.childId).subscribe(response => {
      this.loaderService.isLoading(false);
      if(response.metaInfo){
        this.categoryMetaInformationForm.patchValue(response.metaInfo);
      }
    }, error => {
      this.loaderService.isLoading(false);
      this.alertService.error(error.title);
    })
  }

  /**
  * @function buildForm
  * @return {void}
  * @description Used to create category meta-information form.
  */
  buildForm() {
    this.categoryMetaInformationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      keyword: ['', Validators.required],
    });
  }

  /**
   * @function submit 
   * @returns { void }
   * @description saving category metaInformation in the db
   */
  submit() {
    if (!this.categoryMetaInformationForm.valid) {
      return;
    }
    if (this.childId) {
      this.loaderService.isLoading(true);
      this.categoryService.createCategoryMetaInfo(this.categoryMetaInformationForm.value, this.childId).subscribe(response => {
        this.loaderService.isLoading(false);
        this.parentId ? this.router.navigate([`category/${response.childId}/${response.parentId}/category-products`])
          : this.router.navigate([`category/${response.childId}/${response.parentId}/category-products`])
      }, error => {
        this.alertService.error(error.title)
        this.loaderService.isLoading(false);
      });
    }
    else {
      this.alertService.error('Please fill required field of category info first');
      return;
    }
  }
}
