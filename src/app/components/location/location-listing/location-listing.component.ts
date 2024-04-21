import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { LocationListModel } from 'src/app/models/Location';
import { Route, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from '../../../services/local-Storage';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-location-listing',
  templateUrl: './location-listing.component.html',
  styleUrls: ['./location-listing.component.css']
})
export class LocationListingComponent implements OnInit {
  public locationList: Array<any> = [];
  locationCode: string;
  constructor(private locationService: LocationService,
    private router: Router,
    private alertService: AlertService,
    private localStorage: LocalStorageService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.getLocationList();
  }


  getLocationList() {
    this.loaderService.isLoading(true);
    this.locationService.getAllLocations().subscribe(response => {
      this.loaderService.isLoading(false);
      this.locationList = response.map(x => Object.assign({}, x)
      );
    }
      , error => {
        this.loaderService.isLoading(false);
      });
  }

  addWarehouse() {
    this.router.navigate(['/location/location-info']);
  }
  editLocation(locationCode) {
    this.localStorage.remove('locationCode')
    this.router.navigate([`/location/${locationCode}/location-info`]);
  }

  publishLocation(locationCode) {
    this.loaderService.isLoading(true);
    this.locationService.publishProduct(locationCode).subscribe(response => {
      this.loaderService.isLoading(false);
      this.getLocationList();
      this.alertService.success(null, 'Warehouse has been Published');
    }, error => {
      this.loaderService.isLoading(false);
      this.alertService.error(null);

    });
  }
}
