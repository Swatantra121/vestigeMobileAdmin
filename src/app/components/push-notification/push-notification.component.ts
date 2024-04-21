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
      CSVFile: [null], // for handling file uploads
      imageType: ['', Validators.required],
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

  onFileSelected(event: any): void {
    debugger
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ CSVFile: file });
      this.form.get('CSVFile').updateValueAndValidity();
    }
    
  }

  onImageFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result as string; // For displaying the image
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // 'debugger' keyword pauses the execution in developer tools; ensure to remove it in production
    debugger;
    if (this.form.valid) {
      // Assuming 'form' is a FormGroup and matches the keys used in the API
      const formData = this.form.value;
      let data = {
        "distributer_type": formData.distributerType || "single", // Using form data or default values
        "distributerid": formData.distributerId,
        "title": formData.title,
        "screen": formData.screen || null, // Providing defaults if necessary
        "imageURL": formData.imageUrl || "",
        "imageURLText": formData.imageUrlText || null,
        "screenTitle": formData.screenTitle || null,
        "categoryId": formData.categoryId || null,
        "image_upload": formData.imageUpload || null,
        "skuCode": formData.skuCode || null,
        "message": formData.message,
        "sendToUsers": [formData.distributerId] // Assuming distributerId is used here
      };
      debugger
      this.PusNotificationService.pushNotificationAPI(data).subscribe(
        data => {
          console.log('Notification sent successfully:', data);
          this.form.reset(); // Reset the form after successful submission
          // Optional: Provide user feedback
          alert('Notification sent successfully!');
        },
        error => {
          console.error('Error sending notification:', error);
          // Optional: Provide user feedback
          alert('Failed to send notification. Please try again.');
        }
      );
    } else {
      // Optional: Provide user feedback for invalid form
      alert('Please fill out the form correctly.');
    }
  }
  

}
