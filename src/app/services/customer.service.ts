import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as Urls from 'src/app/utility/Urls';
import { map } from 'rxjs/operators';
import { ModelBindingService } from './modelBinding.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apiService: ApiService,
    private modelBindingService: ModelBindingService
  ) { }

  getAllCustomers() {
    const url = `${Urls.ServiceEnum.Distributor}`;
    return this.apiService.get(url).pipe(map(Response => {
      return this.modelBindingService.mappingDataReturn('customerListDecoder', Response);
    }));
  }

  addcustomer(requestData) {
    const url = `${Urls.ServiceEnum.Distributor}`;
    return this.apiService.post(url, requestData);
  }

  getDistributorParentList() {
    const url = `${Urls.ServiceEnum.Distributor}/random`;
    return this.apiService.get(url);
  }
}
