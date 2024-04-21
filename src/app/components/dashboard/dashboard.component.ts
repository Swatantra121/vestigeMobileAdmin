import { Component, OnInit } from '@angular/core';
import { _ } from 'lodash';
import { LocationService } from 'src/app/services/location.service';
import * as myGlobals from 'src/app/globals';
import { LocalStorageService } from 'src/app/services/local-Storage';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSubmit: boolean = true;
  checked: boolean = false;
  checkedArray: Array<any> = [];
  advanceFilterContainer: boolean = false;
  isDesc: boolean = false;
  column: string = '';
  direction: number;
  searchBy: string = '';
  checkedAll: false;

  productCatalogue: Array<any> = [{
      productId: 2854,
      name: 'Mobile Cover- Multicolor',
      type: 'Downloadable Product',
      sku: 'NKVBS0048- Beige',
      offerPrice: 'R34.5000',
      stockAvailability: 'Out of Stock',
      syncAt: '7 Dec 2018, 3:00 PM',
      inventryType: 'Outright',
      visibility: 'Not Visible individualy',
      status: 'Enabled'
    },
    {
      productId: 2850,
      name: 'Mobile Cover- Multicolor',
      type: 'Downloadable Product',
      sku: 'NKVBS0048- Beige',
      offerPrice: 'R34.5000',
      stockAvailability: 'Out of Stock',
      syncAt: '7 Dec 2018, 3:00 PM',
      inventryType: 'Outright',
      visibility: 'Not Visible individualy',
      status: 'Enabled'
    },
    {
      productId: 3034,
      name: 'Mobile Cover- Multicolor',
      type: 'Downloadable Product',
      sku: 'NKVBS0048- Beige',
      offerPrice: 'R134.5000',
      stockAvailability: 'Out of Stock',
      syncAt: '7 Dec 2018, 3:00 PM',
      inventryType: 'Outright',
      visibility: 'Not Visible individualy',
      status: 'Enabled'
    },
    {
      productId: 2200,
      name: 'Mobile Cover- Multicolor',
      type: 'Downloadable Product',
      sku: 'NKVBS0048- Beige',
      offerPrice: 'R4.5000',
      stockAvailability: 'Out of Stock',
      syncAt: '7 Dec 2018, 3:00 PM',
      inventryType: 'Outright',
      visibility: 'Not Visible individualy',
      status: 'Enabled'
    },
    {
      productId: 1000,
      name: 'Mobile Cover- Multicolor',
      type: 'Downloadable Product',
      sku: 'NKVBS0048- Beige',
      offerPrice: 'R14.5020',
      stockAvailability: 'Out of Stock',
      syncAt: '7 Dec 2018, 3:00 PM',
      inventryType: 'Outright',
      visibility: 'Not Visible individualy',
      status: 'Enabled'
    },
    {
      productId: 4567,
      name: 'Mobile Cover- Multicolor',
      type: 'Downloadable Product',
      sku: 'NKVBS0048- Beige',
      offerPrice: 'R24.5001',
      stockAvailability: 'Out of Stock',
      syncAt: '7 Dec 2018, 3:00 PM',
      inventryType: 'Outright',
      visibility: 'Not Visible individualy',
      status: 'Enabled'
    },
    {
      productId: 9867,
      name: 'Mobile Cover- Multicolor',
      type: 'Downloadable Product',
      sku: 'NKVBS0048- Beige',
      offerPrice: 'R34.5000',
      stockAvailability: 'Out of Stock',
      syncAt: '7 Dec 2018, 3:00 PM',
      inventryType: 'Outright',
      visibility: 'Not Visible individualy',
      status: 'Enabled'
    },
    {
      productId: 7566,
      name: 'Mobile Cover- Multicolor',
      type: 'Downloadable Product',
      sku: 'NKVBS0048- Beige',
      offerPrice: 'R34.5000',
      stockAvailability: 'Out of Stock',
      syncAt: '7 Dec 2018, 3:00 PM',
      inventryType: 'Outright',
      visibility: 'Not Visible individualy',
      status: 'Enabled'
    }]

    isAllSelected = false;

  constructor(private locationService : LocationService, private localStorage: LocalStorageService) { }

  ngOnInit() {
   this.productCatalogue.forEach(element => {
     element.checked = false;
   });
   this.getCountryList();
   this.getCustomerGroupSelection();
  }

  getCountryList(){
    const countryData = this.localStorage.get(myGlobals.STORAGE_KEYS.COUNTRY_LIST);
    const countryList = [];
    !countryData && (
      this.locationService.getCountryList().subscribe((response)=>{
        for(var res of response){
          res.status === true && (countryList.push(res))
        }
       this.localStorage.set(myGlobals.STORAGE_KEYS.COUNTRY_LIST,countryList)
     })
    )
  }

  getCustomerGroupSelection(){
    const customerGroup = this.localStorage.get(myGlobals.STORAGE_KEYS.CUSTOMER_GROUP_SELECTION)
    !customerGroup && (
      this.locationService.getCustomerGroupSelection().subscribe((response)=>{
       this.localStorage.set(myGlobals.STORAGE_KEYS.CUSTOMER_GROUP_SELECTION,response)
     })
    )
  }

  selectedAll(){
    console.log('mannu', this.isAllSelected);
    this.productCatalogue.forEach(element => {
      element.checked = this.isAllSelected;
    });
  }

  isChecked(checked, id){
    if(checked.checked === true)
    {
      this.isSubmit = false;
      this.checkedArray.push({ id: id, checked: checked.checked })
    }
    else {
      this.checkedArray = this.checkedArray.filter((check)=>{
        return check.id !== id
      })
      this.checkedArray.length <= 0 ? this.isSubmit = true : this.isSubmit = false; 
    }
    console.log('CheckedArray',this.checkedArray)
  }

  showAdvanceFilter(advanceFilter){
    this.advanceFilterContainer = advanceFilter;
  }

  sort(property){
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };

  search(product){
    console.log('Product', product);
  }
}
