import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { STATUS_LIST, PRODUCT_IMAGE_FILE_SIZE, SUPPORTED_FILES_EXTS } from 'src/app/utility/Constant';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { LocalStorageService } from 'src/app/services/local-Storage';
import * as myGlobals from 'src/app/globals';

@Component({
  selector: 'app-category-information',
  templateUrl: './category-information.component.html',
  styleUrls: ['./category-information.component.css']
})

export class CategoryInformationComponent implements OnInit {
  categoryInformationForm: FormGroup;
  statusArray: Array<any> = STATUS_LIST;
  activeFor: Array<any> = [];
  uploadImage: Array<any> = [];
  categoryImage: any;
  childId: string;
  parentId: string;
  imageSrc: any;
  categoryInfo: any = {};
  minDate: Date = new Date();
  maxDate: Date = new Date(2020, 0, 1);
  url: string = 'http://115.249.4.195:8080';

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private alertService: AlertService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private loaderService: LoaderService) {
    this.childId = this.route.snapshot.paramMap.get('childId');
    this.parentId = this.route.snapshot.paramMap.get('parentId');
    this.localStorage.set('CHILD_ID', this.childId);
    this.localStorage.set('PARENT_ID',this.parentId);
  }

  ngOnInit() {
    this.buildForm();
    this.activeForList();
    this.childId && this.getCategoryInfo()
  }

  /**
 * @function buildForm
 * @return {void}
 * @description Used to create category-information form.
 */
  buildForm() {
    this.categoryInformationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(myGlobals.regEx.nameWithSpecialCharacters)]],
      description: ['', [Validators.required, Validators.pattern(myGlobals.regEx.nameWithSpecialCharacters)]],
      image: ['', Validators.required],
      isIncludeInNavigation: ['', Validators.required],
      activeFor: ['', Validators.required],
      activeFrom: [''],
      activeTo: [''],
      isDynamicKittingCategory: ['', Validators.required],
      urlKey: ['',Validators.pattern(myGlobals.regEx.url)],
      isActive: ['', Validators.required],
      childId: ['']
    });
  }

  activeForList(){
    this.loaderService.isLoading(true);
    this.categoryService.activeForList().subscribe(response=>{
      this.loaderService.isLoading(false);
      this.activeFor = response;
    },error=>{
      this.loaderService.isLoading(false);
      this.alertService.error(null,error.title)
    })
  }

  getCategoryInfo() {
    this.loaderService.isLoading(true);
    this.categoryService.searchSubCategories(this.childId).subscribe(response => {
      this.loaderService.isLoading(false);
      if (this.parentId) {
        this.imageSrc = response.image;
        delete response['image'];
        this.categoryInformationForm.patchValue(response);
        this.categoryInformationForm.controls.image.disable();
        this.categoryInformationForm.controls.image.clearValidators();
      }
      this.categoryInfo = response;
    }, error => {
      this.loaderService.isLoading(false);
      this.alertService.error(null,error.title);
    })
  }



  /**
   * @function readURL reading the file type image 
   * @param event 
   * @description reading the image from the source and uploads it to the server
   */
  readURL(event) {
    const reader = new FileReader();
    if (event.target.files) {
      const file = event.target.files[0];
      if (!SUPPORTED_FILES_EXTS.includes(file.type)) {
        this.alertService.error(null,`Only images are allowed`);
        return;
      } else if (PRODUCT_IMAGE_FILE_SIZE <= file.size) {
        this.alertService.error(null,'max size exceeded. image must be less than 1 mb');
        return;
      } else {
        this.loaderService.isLoading(true);
        this.uploadImage.push(file);
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result;
          this.categoryInformationForm.controls.image.disable()
        }
        this.categoryService.uploadFile(this.uploadImage).subscribe(res => {
          this.loaderService.isLoading(false);
          this.categoryImage = res['fileUploadUri'];
          this.alertService.success(null,res['message'])
        }, error => {
          this.alertService.error(null,error.title);
          this.loaderService.isLoading(false);
        })
      }
    }
  }

  removeCategoryImage() {
    this.categoryInformationForm.controls.image.enable();
    this.imageSrc = '';
  }

  /**
   * @function submit 
   * @returns { void }
   * @description saving categoryInformation in the db
   */
  submit() {
 
    if (!this.categoryInformationForm.valid) {
      return;
    }
    if(!this.imageSrc){
      this.alertService.error(null,'Please upload the image');
      return;
    }
    const value = this.categoryInformationForm.value;
    if (this.parentId) {
      value.image = this.categoryImage ? this.categoryImage : this.imageSrc.replace(this.url, '')
      value.activeFrom = value.activeFrom !== this.categoryInfo.activeFrom ? value.activeFrom.toISOString() : value.activeFrom
      value.activeTo = value.activeTo !== this.categoryInfo.activeTo ? value.activeTo.toISOString() : value.activeTo
    } else {
      value.activeFrom = value.activeFrom ? value.activeFrom.toISOString() : '';
      value.activeTo = value.activeTo ? value.activeTo.toISOString() : '';
      value.image = this.categoryImage;
    }
    if (this.childId && Object.keys(this.categoryInfo).length > 0) {
      value.childId = this.childId ? this.childId : this.categoryInfo['childId']
    }
    this.categoryService.createCategoryInfo(value, this.parentId ? true : false)
      .subscribe(response => {
        this.loaderService.isLoading(false);
        this.localStorage.set('CHILD_ID', response.childId)
        this.parentId ? this.router.navigate([`category/${this.childId}/${response.parentId}/meta-information`])
          : this.router.navigate([`category/${response.childId}/meta-information`])
      },
        error => {
          this.alertService.error(null,error.title);
          this.loaderService.isLoading(false)
        })
  }
}
