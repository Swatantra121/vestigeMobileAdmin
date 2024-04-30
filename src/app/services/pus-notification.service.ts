import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import * as Urls from 'src/app/utility/Urls';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-Storage';
import * as myGlobals from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})

export class PusNotificationService {

  constructor(private apiService: ApiService,
    private localStorage: LocalStorageService,
    private http: HttpClient)
     { }
    pushNotificationAPI(data) {
      //
       console.log(data);
      return this.apiService.post(Urls.ServiceEnum.pushNotification, data);
      // return this.apiService.post('http://13.232.167.44:8080/auth/training-login', credentials)
    }
   
      notificationRequest(request,file){  
        //
        const url = Urls.ServiceEnum.multiDist+`?message=${request.message}&title=${request.title}&imageURL=${request.imageURL}&screen=${request.screen}&screenTitle=${request.screenTitle}&skuCode=${request.skuCode}&categoryId=${request.categoryId}`;
        return this.apiService.uploadFile(url, file, "CSV");
      }
    

    
    imageUpload(data) {
      //
       console.log(data);
      // return this.apiService.post(Urls.ServiceEnum.imageUploadurl, data);
      // return this.apiService.post(Urls.ServiceEnum.imageUploadurl, data);
     return  this.http.post(Urls.ServiceEnum.imageUploadurl, data)
      
    
      // return this.apiService.post('http://13.232.167.44:8080/auth/training-login', credentials)
    }

    checkDistributer(formdata){
      return this.apiService.post(Urls.ServiceEnum.checkDistId, formdata);
    }
   
  
      
   
}

