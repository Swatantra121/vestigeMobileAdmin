import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LocalStorageService } from 'src/app/services/local-Storage';
// import * as myGlobals from 'src/app/globals';
import { LoaderService } from 'src/app/services/loader.service';
import {PusNotificationService} from 'src/app/services/pus-notification.service'
// import {  } from '@angular/forms';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {
  form: FormGroup;
  imageUrl: string; // Manage URL separately if not part of form submission
  Imgurl : any ;
  private selectedFile: File;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    // private router: Router,
    private localStorage: LocalStorageService,
    public alertService: AlertService,
    private PusNotificationService: PusNotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      selectedDistributor: ['single', Validators.required],
      singleDistributorId: [''],
      title: ['', Validators.required],
      multiple: [null], // for handling file uploads
      imageType: ['Image', Validators.required],
      ImgUrl: [''],
      message: ['', Validators.required]
    });
      
    // Conditionally enable or disable singleDistributorId based on selectedDistributor
    this.form.get('selectedDistributor').valueChanges.subscribe(value => {
      if (value === 'single') {
        this.form.get('singleDistributorId').enable();
      } else {
        this.form.get('singleDistributorId').disable();
      }
    });
    this.form.get('imageType').valueChanges.subscribe(value => {
      if (value === 'url') {
        this.form.get('ImgUrl').setValidators(Validators.required);
        this.form.get('ImgUrl').updateValueAndValidity();
        this.form.get('ImgUrl').enable();
      } else {
        this.form.get('ImgUrl').clearValidators();
        this.form.get('ImgUrl').updateValueAndValidity();
        this.form.get('ImgUrl').disable();
      }
    });
  }
  distributeridarray : any 
  validateDist(data){
    debugger
    const formData = this.form.value;
    const distributerid = data.target['value'];
    this.distributeridarray = [];
    if(distributerid.length == 8){
      this.distributeridarray.push(formData.singleDistributorId);
      //check distributer
      this.PusNotificationService.checkDistributer(this.distributeridarray).subscribe(result => {
        this.loaderService.isLoading(false);
        if(result.length == 1){ 
          if(result[0].isValid == false){
            this.alertService.error('Disributer id not Registered.');
            return false;
          }else{
            this.alertService.success(null, 'Distributer Validated');
          }
        }
      }, error => {
        this.alertService.error(null);
        this.loaderService.isLoading(false);
      });
    }
    this.alertService.error('Please enter valid distributer.')
    this.loaderService.isLoading(false);
  }
  onFileSelected(event: any): void {
    debugger
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      this.form.get('multiple').setValue(file); // Update form control
    } else {
      alert('Please select a valid CSV file.');
    }
    
  }
  onFileSelectedImg(event: any): void {
    debugger
    this.selectedFile = event.target.files[0];
    this.upload()
  }
  upload(): void {
    debugger
    if (this.selectedFile) {
      // Prepare the form data
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('filetype', 'IMAGE');

      this.PusNotificationService.imageUpload(formData).subscribe(event => {
        console.log(event); // Handle the progress and response here
        let imgUrl  :any  = event;
         this.Imgurl =   imgUrl.fileUploadUri
      
      }, error => {
        console.error('Upload error:', error);
      });
    }
  }


  onSubmit() {
    // 'debugger' keyword pauses the execution in developer tools; ensure to remove it in production
    this.loaderService.isLoading(true);
    debugger;
    if (this.form.valid) {
      // Assuming 'form' is a FormGroup and matches the keys used in the API
      
      const formData = this.form.value;
      if(formData.selectedDistributor=='multiple'){

      }
      let formDataSingle = {
        "distributer_type": formData.distributerType || "single", // Using form data or default values
        "distributerid": formData.singleDistributorId,
        "title": formData.title,
        "screen": formData.screen || null, // Providing defaults if necessary
        "imageURL": this.Imgurl || "",
        "imageURLText": formData.imageUrlText || null,
        "screenTitle": formData.screenTitle || null,
        "categoryId": formData.categoryId || null,
        "image_upload": formData.imageUpload || null,
        "skuCode": formData.skuCode || null,
        "message": formData.message,
        "sendToUsers": [formData.singleDistributorId] // Assuming distributerId is used here
      };
      debugger
      this.PusNotificationService.pushNotificationAPI(formDataSingle).subscribe(
        data => {
          console.log('Notification sent successfully:', data[0].pushNotificationStatus);
          this.form.reset(); // Reset the form after successful submission
          // Optional: Provide user feedback
          // alert(data[0].pushNotificationStatus);
          this.alertService.error(data[0].pushNotificationStatus);
          this.loaderService.isLoading(false);
        },
        error => {
          console.error('Error sending notification:', error);
          // Optional: Provide user feedback
          // alert('Failed to send notification. Please try again.');
          this.alertService.error('Error sending notification:', error);
          this.loaderService.isLoading(false);
        }
      );
    } else {
      // Optional: Provide user feedback for invalid form
      alert('Please fill out the form correctly.');
    }
  }
  

}
