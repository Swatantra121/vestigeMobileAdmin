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
    private router: Router) { }
    pushNotificationAPI(data) {
      debugger
       console.log(data);
      return this.apiService.post(Urls.ServiceEnum.pushNotification, data);
      // return this.apiService.post('http://13.232.167.44:8080/auth/training-login', credentials)
    }
}

