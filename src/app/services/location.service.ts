import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import * as Urls from 'src/app/utility/Urls';
import { ModelBindingService } from './modelBinding.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private apiService: ApiService,
    private modelBindingService: ModelBindingService) { }

  locationInfoRequest(request, locationCode?) {
    if (locationCode) {
      return this.apiService.put(`${Urls.ServiceEnum.Location}/location-info/${locationCode}`, request);
    } else {
      return this.apiService.post(`${Urls.ServiceEnum.Location}/location-info`, request);
    }
  }

  addressInfoRequest(request, locationCode?) {
    return this.apiService.put(`${Urls.ServiceEnum.Location}/address-info/${locationCode}`, request);
  }

  inventoryRequest(request, locationCode?) {
      return this.apiService.put(`${Urls.ServiceEnum.Location}/inventory-info/${locationCode}`, request);
  }

  getBackOrder() {
    return this.apiService.get(`${Urls.ServiceEnum.Location}/location-backorder-selection`);
  }

  /**
   * @function getAllLocations
   * @description location listing from the server
   * @returns locationListing
   */
  getAllLocations() {
    const url = Urls.ServiceEnum.Location;
    return this.apiService.get(url).pipe(map(Response => {
      return this.modelBindingService.mappingDataReturn('locationListDecoder', Response);
    })
    );
  }

  getLocationsById(locationCode) {
    return this.apiService.get(`${Urls.ServiceEnum.Location}/${locationCode}`);
  }
  publishProduct(request) {
    return this.apiService.put(`${Urls.ServiceEnum.Location}/publish/${request}`, request);
  }
  getWarehouseTypes() {
    return this.apiService.get(`${Urls.ServiceEnum.Location}/${Urls.DistributorServiceEnum.WarehouseTypes}`);
  }

  getCustomerGroupSelection() {
    return this.apiService.get(`${Urls.ServiceEnum.Location}/${Urls.DistributorServiceEnum.CustomerGroupSelection}`)
  }

  getStoreViewSelection() {
    return this.apiService.get(`${Urls.ServiceEnum.Location}/${Urls.DistributorServiceEnum.StoreViewSelection}`)
  }
  getBackorderSelection() {
    return this.apiService.get(`${Urls.ServiceEnum.Location}/${Urls.DistributorServiceEnum.BackorderSelection}`)
  }
  /**
   * @description fetching country, state, city on the basis of pincode
   * @function getCountryList fetching info on the basis of pincode
   */
  getCountryStateCity(pincode) {
    return this.apiService.get(`${Urls.ServiceEnum.CountryStateCity}${pincode}`)
  }


  /**
   * @description fetching country list
   * @function getCountryList fetching country master list
   */
  getCountryList() {
    const url = Urls.ServiceEnum.CountryList;
    return this.apiService.get(url).pipe(map(Response => {
      return this.modelBindingService.mappingDataReturn('countryListDecoder', Response);
    }));
  }

  /**
   * @description fetching country list
   * @param id => country id states are coming on the basis on country id
   */
  getStateList(id) {
    const url = `${Urls.ServiceEnum.StateList}${id}`;
    return this.apiService.get(url).pipe(map(Response => {
      return this.modelBindingService.mappingDataReturn('stateListDecoder', Response);
    }));
  }

  /**
   * @description fetching city list
   * @param id => state id city are coming on the basis on state id
   */
  getCityList(id) {
    const url = `${Urls.ServiceEnum.CityList}${id}`;
    return this.apiService.get(url).pipe(map(Response => {
      return this.modelBindingService.mappingDataReturn('cityListDecoder', Response);
    }));
  }
}
