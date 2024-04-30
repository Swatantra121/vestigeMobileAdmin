import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as Urls from 'src/app/utility/Urls';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-Storage';
import * as myGlobals from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl: String = '';

  constructor( private apiService: ApiService,
               private localStorage: LocalStorageService,
               private router: Router) { }

  getToken() {
    const token = this.localStorage.get(myGlobals.STORAGE_KEYS.TOKEN_KEY);
    return token;
  }

  login(credentials) {
    //
     console.log(credentials);
    return this.apiService.post(Urls.ServiceEnum.Login, credentials);
    // return this.apiService.post('http://13.232.167.44:8080/auth/training-login', credentials)
  }

  signup(data) {
     return this.apiService.post(Urls.ServiceEnum.Distributor, data);
   }

   logout() {
     this.localStorage.clear();
     this.router.navigate(['/login']);
   }

   getDistributorIdListData() {
     return this.apiService.get(`${Urls.ServiceEnum.Distributor}/${Urls.DistributorServiceEnum.RandomDistributor}`);
   }

  otpOnMobile(rmn) {
    const otpUrl = Urls.ServiceEnum.Otp + rmn;
    console.log(otpUrl);
    return this.apiService.get(otpUrl);
  }

  public isAuthenticated(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
