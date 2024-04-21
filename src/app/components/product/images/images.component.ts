import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';
import { idGenerator } from 'src/app/utility/Utility';
import { SUPPORTED_FILES_EXTS, PRODUCT_MAX_IMAGE, PRODUCT_IMAGE_FILE_SIZE } from 'src/app/utility/Constant';
import { LoaderService } from 'src/app/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-Storage';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  skuCode: string;
  imagesForm: FormGroup;
  productImagesField;
  productImages: FormArray;
  selectedArray: Array<any> = [];
  imageSrc = new Map();
  uploadArray: Array<any> = [];
  positionList: Array<any> = [];
  actionList = [{ key: 'Delete', value: 'delete' }];
  baseUrl: string = 'http://115.249.4.195:8080';

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private ng2ImgMax: Ng2ImgMaxService,
    private localStorage: LocalStorageService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private loaderService: LoaderService) {
    this.skuCode = this.route.snapshot.paramMap.get('skuCode');
    this.localStorage.set('skuCode', this.skuCode);
  }

  ngOnInit() {
    this.buildForm()
    this.getFormValue()
  }

  buildForm() {
    this.imagesForm = this.formBuilder.group({
      productImages: this.formBuilder.array(this.createImageField())
    });
    this.productImagesField = <FormArray>this.imagesForm.controls.productImages;
  }

  createImageField() {
    const productImagesArray = [];
    for (let field = 0; field < 10; field++) {
      this.imageSrc.set(field, '');
      const group = this.formBuilder.group({
        url: [''],
        position: [{ value: '', disabled: true }],
        name: [null],
        type: ['HERO'],
        checked: [{ value: false, disabled: true }],
        isDefault: [{ value: false, disabled: true }, Validators.required],
      });
      productImagesArray.push(group);
    }
    return productImagesArray;
  }

  getFormValue() {
    this.loaderService.isLoading(true);
    this.productImagesField.controls[0].patchValue({
      isDefault: true
    });
    this.productService.getProductBySkucode(this.skuCode).subscribe(response => {
      // Editing Flow

      if (response.images) {
        this.positionList = idGenerator(response.images.length, false)
        response.images.map((ele, index) => {
          ele.url = this.baseUrl + ele.url;
          this.productImagesField.controls[index].enable();
        })
        this.productImagesField.patchValue(response.images);
      }
      this.loaderService.isLoading(false);

    }, error => {
      this.loaderService.isLoading(false);
      this.alertService.error(null, error.title);
    });
  }


  readURL(event, index?): void {
    const noOfImageUploaded = this.uploadArray.length;
    const length = this.productImagesField.value.filter(image => image.url && image).length;
    const totalImagesUploaded = this.uploadArray.length + length + event.target.files.length;
    if (event.target.files.length && totalImagesUploaded <= PRODUCT_MAX_IMAGE || index && index <= PRODUCT_MAX_IMAGE) {
      for (let i = 0; i < event.target.files.length; i++) {
        (length + noOfImageUploaded) < 10 &&
          this.imagesForm.get('productImages')['controls'][i + length + noOfImageUploaded].enable()
        const file = event.target.files[i];

        if (!SUPPORTED_FILES_EXTS.includes(file.type)) {
          this.alertService.error(null, `Only images are allowed`);
          return;
        }

        if (PRODUCT_IMAGE_FILE_SIZE <= file.size) {
          this.alertService.error(null, 'max size exceeded. image must be less than 1 mb');
          return;
        }

        if (index >= 0) {
          this.uploadArray.length === 0 ? this.uploadArray.push(file) :
            this.uploadArray[index] = file
        } else {
          this.uploadArray.push(file);
        }

        this.ng2ImgMax.resizeImage(file, 200, 200).subscribe(
          result => {
            const uploadedImage = new File([result], result.name);
            const reader = new FileReader();
            reader.readAsDataURL(uploadedImage);
            reader.onload = () => {
              if (this.uploadArray.length > 0) {
                index >= 0 ? (
                  this.imageSrc.set(index, reader.result),
                  this.editProductImages(file, index)
                ) : this.imageSrc.set(length + noOfImageUploaded + i, reader.result);
              }
              else {
                this.imageSrc.set(i, reader.result);
              }
            }
            this.loaderService.isLoading(false);
          },
          error => {
            this.loaderService.isLoading(false);
          }
        );
      }

      this.positionList = idGenerator(this.uploadArray.length + length, false)
      this.loaderService.isLoading(true);
    } else {
      this.alertService.error(null, 'You can upload only 10 images');
    }
  }

  editProductImages(file, imageIndex) {
    this.productService.uploadProductImages([file], this.skuCode).subscribe(response => {
      const length = this.productImagesField.value.filter(image => image.url && image).length
      for (const index of Object.keys(response)) {
        response[index].fileUploadUri = `${this.baseUrl}${response[index].fileUploadUri}`;
        this.productImagesField.controls[imageIndex].patchValue({
          url: response[index].fileUploadUri,
          name: response[index].fileName
        });
      }
      this.uploadArray = [];
    }, error => {
      this.loaderService.isLoading(false);
      this.alertService.error(null, error.title);
    });
  }

  onSelectionChange(index) {
    const length = this.productImagesField.value.length
    for (let i = 0; i < length; i++) {
      this.productImagesField.controls[i].patchValue({
        isDefault: i !== index ? false : true
      })
    }
  }

  selectPosition(position, index) {
    const isPositionExist = []
    this.productImagesField.controls.filter((imageField,index)=> imageField.value.position && (isPositionExist.push({value: imageField.value.position, positionIndex: index})));
    isPositionExist.length > 1 &&
      isPositionExist.forEach((item) => {
        (position.value === item.value && item.positionIndex != index) && this.productImagesField.controls[item.positionIndex].patchValue({
          position: ''
        })
    })
  }


  actionFunction(action) {
    action === 'delete' && this.removeProductImage(this.selectedArray.toString());
    this.selectedArray = [];
  }

  isChecked(checked, image) {
    checked.checked === true ? this.selectedArray.push(image.name) :
      (this.selectedArray = this.selectedArray.filter(element => element !== image.name));
  }

  selectedAll(checked) {
    const length = this.productImagesField.value.length
    for (let i = 0; i < length; i++) {
      this.productImagesField.controls[i].value.url && (
        this.productImagesField.controls[i].patchValue({
          checked: checked.checked === true ? true : false
        }),
        this.selectedArray.push(this.productImagesField.controls[i].value.name)
      )
    }
    !checked.checked && (this.selectedArray = [])
  }

  createImageFormArray(index): FormGroup {
    return this.formBuilder.group({
      url: [''],
      position: [{ value: '', disabled: true }],
      name: [null],
      type: ['HERO'],
      checked: [{ value: false, disabled: true }],
      isDefault: [{ value: false, disabled: true }, Validators.required],
    });
  }

  submit() {
    if (!this.uploadArray) {
      this.alertService.error(null, 'Please upload Images to save.');
      return;
    }

    this.loaderService.isLoading(true);
    this.productService.uploadProductImages(this.uploadArray, this.skuCode).subscribe(response => {
      const length = this.productImagesField.value.filter(image => image.url && image).length
      for (const index of Object.keys(response)) {
        response[index].fileUploadUri = `${this.baseUrl}${response[index].fileUploadUri}`;
        let field = this.productImagesField.controls[Number(index) + length].patchValue({
          url: response[index].fileUploadUri,
          name: response[index].fileName
        });
      }
      this.saveImageDetail();
      this.loaderService.isLoading(false);
      this.uploadArray = [];
      this.imageSrc.clear();
    }, error => {
      this.loaderService.isLoading(false);
      this.alertService.error(null, error.title);
    });
  }


  saveImageDetail() {
    const length = this.productImagesField.value.filter(image => image.url && image).length
    const positionExist = this.productImagesField.value.filter(image => image.url && image && image.position).length
    if (length === 0) {
      this.alertService.error(null, 'Please upload an image first');
      return;
    }
    if (length > positionExist) {
      this.alertService.error(null, 'Please set the position for all images');
      return;
    }
    const index = this.productImagesField.value.findIndex(image => image.isDefault === true)
    if (index < 0) {
      this.alertService.error(null, 'Please select default position from one of the images');
      return;
    }
    const value = this.productImagesField.value.filter(image => image.url && (image.url = image.url.replace(this.baseUrl, ''), delete image.checked))
    this.productService.uploadProductDetails(value, this.skuCode).subscribe(response => {
      for (const index of Object.keys(response.images)) {
        response.images[index].url = `${this.baseUrl}${response.images[index].url}`
        this.productImagesField.controls[Number(index) + length].patchValue({
          url: response.images[index].url,
          name: response.images[index].name
        });
      }
      this.alertService.success(null, 'Image details saved successfully');
      this.router.navigate([`/product/${this.skuCode}/meta-information`]);
    }, error => {
      this.alertService.error(null, error.title)
      this.loaderService.isLoading(false);
    });
  }

  removeProductImage(image) {
    this.loaderService.isLoading(true);
    const imageList = image.includes(',');
    if (imageList) {
      const imagesListArray = image.split(',');
      imagesListArray.forEach(element => {
        const index = this.productImagesField.value.findIndex(productImage => productImage.name === element);
        this.productImagesField.removeAt(index)
        const formField = <FormArray>this.imagesForm.controls['productImages']
        formField.push(this.createImageFormArray(index));
        this.imageSrc.set(index, '')
      });
    } else {
      const index = this.productImagesField.value.findIndex(productImage => productImage.name === image);
      this.productImagesField.removeAt(index)
      const formField = <FormArray>this.imagesForm.controls['productImages']
      formField.push(this.createImageFormArray(index));
      this.imageSrc.set(index, '')
    }
    this.productService.deleteProductImages(this.skuCode, image).subscribe((response) => {
      this.loaderService.isLoading(false);
      this.alertService.success(null, response.message)
    }, error => {
      this.loaderService.isLoading(false);
      this.alertService.error(null, error.title)
    })
  }
}
