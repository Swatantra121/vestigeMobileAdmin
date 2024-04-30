import { Component, ElementRef, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
// import { LocalStorageService } from 'src/app/services/local-Storage';
// import * as myGlobals from 'src/app/globals';
import { SUPPORTED_FILES_EXTS, PRODUCT_MAX_IMAGE, PRODUCT_IMAGE_FILE_SIZE } from 'src/app/utility/Constant';
import { LoaderService } from 'src/app/services/loader.service';
import {PusNotificationService} from 'src/app/services/pus-notification.service'
// import {  } from '@angular/forms';
// import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as myGlobals from 'src/app/globals';
import * as XLSX from 'xlsx';  
import * as FileSaver from 'file-saver';

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
  valididarray = [];
  worksheet: any;  
  storeData: any;
  uploadedFiles: any;
  imageSrc: string | ArrayBuffer;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    // private router: Router,
    // private localStorage: LocalStorageService,
    public alertService: AlertService,
    private PusNotificationService: PusNotificationService,
    private loaderService: LoaderService
  ) {}
  

  ngOnInit() {
    this.form = this.fb.group({
      selectedDistributor: ['single'],
      singleDistributorId: [''],
      title: [''],
      multiple: [null], // for handling file uploads
      // imageType: ['Image'],
      ImgUrl: [''],
      message: ['']
    });
      
    // Conditionally enable or disable singleDistributorId based on selectedDistributor
    this.form.get('selectedDistributor').valueChanges.subscribe(value => {
      if (value === 'single') {
        this.form.get('singleDistributorId').enable();
      } else {
        this.form.get('singleDistributorId').disable();
      }
    });
    // this.form.get('imageType').valueChanges.subscribe(value => {
    //   if (value === 'url') {
    //     this.form.get('ImgUrl').setValidators(Validators.required);
    //     this.form.get('ImgUrl').updateValueAndValidity();
    //     // this.form.get('ImgUrl').enable();
    //   } else {
    //     this.form.get('ImgUrl').clearValidators();
    //     this.form.get('ImgUrl').updateValueAndValidity();
    //     // this.form.get('ImgUrl').disable();
    //   }
    // });
  }
  distributeridarray : any 
  validateDist(data){
    //
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
  onFileSelected(event: any) {
    //
    this.valididarray = [];
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    this.uploadedFiles= target.files[0]
    let filenames=this.uploadedFiles.name.split('.');
    if(filenames[filenames.length-1]!=="csv")
    {
      this.alertService.error( null, 'Please Select CSV File.');
      this.resetUploadFieldCsv()
       this.loaderService.isLoading(false);
    return
    }
    console.log(this.uploadedFiles)
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      
      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.distributeridarray = [];
      /* save data */
      // const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      // data.forEach(element => { console.log(element['distributor_id']);
      //   this.distributeridarray.push(element['distributor_id']);
      // });
     //check distributer
    //  this.pushNotificationService.checkDistributer(this.distributeridarray).subscribe(result => {
    //   this.loaderService.isLoading(false);
    //   this.distributeridarray = [];
    //   result.body.forEach(element => {
    //     if(element.isValid == true){ 
    //       this.distributeridarray.push(element['distributorId']);
    //     }
    //   });
    // }, error => {
    //     this.alertService.error('Disributer id not Registered.');
    //     this.loaderService.isLoading(false);
    //   });
    }
  };

  onImageFileSelected(event: any): void {
    //
   
    
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Set the base64 string to imageSrc
      };
  
      reader.readAsDataURL(this.selectedFile); // Read file as Data URL (base64)
    }
    this.upload()
  }
  resetUploadField(): void {
    const inputField = document.getElementById('fileInput') as HTMLInputElement;
    if (inputField) {
      inputField.value = "";  // Clear the current files
    }
    this.imageSrc =''
  }

  resetUploadFieldCsv(): void {
    const inputField = document.getElementById('CSVfile') as HTMLInputElement;
    if (inputField) {
      inputField.value = "";  // Clear the current files
    }
  }
  upload(): void {
    //; // Remember to remove or comment out // in production
    if (this.selectedFile) {
        // Check if the selected file is a JPEG or PNG
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(this.selectedFile.type)) {
            // alert('Invalid file type. Only JPEG and PNG are allowed.');
            this.alertService.error(null, 'Invalid file type. Only JPEG and PNG are allowed.');
            this.resetUploadField();
            return; // Stop the function if the file is not JPEG or PNG
        }

        // Prepare the form data
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('filetype', 'IMAGE');

        this.PusNotificationService.imageUpload(formData).subscribe(
            event => {
                console.log('Upload successful', event);
                let imgUrl: any = event; // Adjust based on the actual API response
                this.Imgurl = imgUrl.fileUploadUri; // Adjust based on the actual API response
            },
            error => {
                console.error('Upload error:', error);
            }
        );
    } else {
        console.error('No file selected.');
    }
    
}



  onSubmit() {
    const formData = this.form.value;
   
    this.loaderService.isLoading(true);

    // this.upload()
    //;
    if (this.form.valid) {
      // Assuming 'form' is a FormGroup and matches the keys used in the API
      // console.log(this.uploadedFiles);
    
     
      if(formData.selectedDistributor=='multiple'){
        
          if(this.uploadedFiles ==undefined){
            // alert("Please select the csv file")
            this.alertService.error(null, "Please select the csv file");
            this.loaderService.isLoading(false);
            return
          }
          if(this.uploadedFiles ==undefined){
            // alert("Please select the csv file")
            this.alertService.error(null, "Please select the csv file");
            this.loaderService.isLoading(false);
            return
          }
         
          else if(this.form.get('title').value==""){
            this.alertService.error( null, 'Please enter the title.');
            this.loaderService.isLoading(false);
            return
          }
        else if( this.form.get('message').value==""){
            this.alertService.error( null, 'Please enter the message.');
            this.loaderService.isLoading(false);
            return
          }
        let notificationMultipleData= {
          "categoryId": formData.categoryId || null,
          "distributer_type": formData.distributerType ,
          "distributerid": formData.singleDistributorId,
          "imageURL": this.Imgurl || "",
          "message": formData.message,
          "screen": formData.screen || "", // Providing defaults if necessary
          "screenTitle": formData.screenTitle || null,
          "sendToUsers": [formData.singleDistributorId], // Assuming distributerId is used here
          "skuCode": formData.skuCode || null,
          "title": formData.title,
        }
        this.PusNotificationService.notificationRequest(notificationMultipleData,this.uploadedFiles).subscribe(res => {
          this.distributeridarray = [];
          this.loaderService.isLoading(false);
          this.alertService.success(null, 'Notification Added Successfully.');
          // location.reload();
          // this.form.reset()
          this.form.get('singleDistributorId').reset();
          this.form.get('title').reset();
          this.form.get('message').reset()
          this.resetUploadFieldCsv();
          this.resetUploadField();
        }, error => {
          console.log(error)
          this.alertService.error(error.message, error.text);
          this.loaderService.isLoading(false);
          this.form.get('singleDistributorId').reset();
          this.form.get('title').reset();
          this.form.get('message').reset()
          this.resetUploadFieldCsv();
          this.resetUploadField();
        });

      }
      else{
        if(this.form.get('singleDistributorId').value==""){
          this.alertService.error( null, 'Please enter the Distributor id.');
          this.loaderService.isLoading(false);
          return
        }
        else if(this.form.get('title').value==""){
          this.alertService.error( null, 'Please enter the title.');
          this.loaderService.isLoading(false);
          return
        }
      else if( this.form.get('message').value==""){
          this.alertService.error( null, 'Please enter the message.');
          this.loaderService.isLoading(false);
          return
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
        //
        this.PusNotificationService.pushNotificationAPI(formDataSingle).subscribe(
          data => {
            this.alertService.success(null, 'Notification Added Successfully.');
            // this.form.reset(); // Reset the form after successful submission
            this.form.get('singleDistributorId').reset();
            this.form.get('title').reset();
            this.form.get('message').reset();
            // this.form.get('imageType').reset()
            this.resetUploadField();
            this.loaderService.isLoading(false);
          },
          error => {
            // console.error('Error sending notification:', error);
            // Optional: Provide user feedback
            // alert('Failed to send notification. Please try again.');
            this.alertService.error(error, 'Error sending notification:');
            this.loaderService.isLoading(false);
          }
        ); 
      }
   
    } else {
      // Optional: Provide user feedback for invalid form
      // alert('Please fill out the form correctly.');
    
      
     
      this.alertService.error( null, 'Please fill out the form correctly.');
      
      this.loaderService.isLoading(false);
    }
  }
  

}
