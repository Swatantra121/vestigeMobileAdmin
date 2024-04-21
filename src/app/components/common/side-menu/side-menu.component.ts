import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SUB_ROUTE, VESTIGE_ADMIN_PANEL_ROUTE } from 'src/app/utility/Constant';
import { RouterModule, Routes, Event, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import * as menuType from './menu-items';
import { RouterService } from 'src/app/services/router.service';
import { LocalStorageService } from '../../../services/local-Storage';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  activeItem: string;
  menuItems = [];
  subscribedRouter;


  constructor(private router: Router,
    private routerService: RouterService,
    private localStorage: LocalStorageService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getActiveMenuItem();
  }

  getActiveMenuItem() {
    this.subscribedRouter = this.routerService.activeRouteUrl.subscribe((data) => {
      this.activeItem = data.title;
      this.setMenu(data.title)
      this.processUrl(data.url);
    });
  }

  processUrl(inputUrl) {
    const urlBreak = inputUrl.split("/");
    for (let item of this.menuItems) {
      if (item.subItems) {
        for (let subItem of item.subItems) {
          if (subItem.link.split("/").slice(-1).pop() === urlBreak.slice(-1).pop()) {
            item.active = true;
            item.isOpen = true;
          }
        }
      }
    }
  }

  openMenuItem(index) {
    this.menuItems[index].isOpen = this.menuItems[index].isOpen ? false : true;
  }

  setMenu(name) {
    switch (name) {
      case 'Product Setting': this.menuItems = menuType.PRODUCT_SETTING_MENU;
        break;
      case 'Product General':
      case 'Product Price':
      case 'Product Images':
      case 'Product Meta Information':
      case 'Product Inventory':
      case 'Product Categories':
      case 'Product Related Products':
      case 'Product Up sells':
      case 'Related Products':
      case 'Product Cross sells': this.menuItems = menuType.PRODUCT_INFO_MENU;
        break;
      case 'Category Information':
      case 'Meta Information':
      case 'Category Products': this.menuItems = menuType.CATEGORY_INFO_MENU;
        break;
      case 'Location Info':
      case 'Location Address':
      case 'Location Inventory': this.menuItems = menuType.LOCATION_MENU;
        break;
      case 'Customer Information':
      case 'Customer VBD':
      case 'Customer Edit AccountInfo':
      case 'Customer Edit Addresses':
      case 'Customer Orders':
      case 'Customer ShoppingCart':
      case 'Customer Wishlist': this.menuItems = menuType.CUSTOMERS_INFO_MENU;
        break;
      case 'Customer Addresses':
      case 'Customer AccountInfo': this.menuItems = menuType.CUSTOMERS_ADD_MENU;
        break;
      case 'View Invoice':
      case 'View Invoice': this.menuItems = menuType.INVOICES_VIEW_MENU;
        break;
      case 'AboutVBD PageInfo':
      case 'AboutVBD Content':
      case 'AboutVBD MetaInfo': this.menuItems = menuType.ABOUT_VBD_MENU;
      
        break;
      case 'Banner Info': this.menuItems = menuType.BANNER_MENU;
        break;
      default: this.menuItems = menuType.MAIN_MENU_ITEM;
    }
    this.menuItems = JSON.parse(JSON.stringify(this.menuItems));
  }


  navigateTo(name, url) {
    const skuCode = this.localStorage.get('skuCode');
    const locationCode = this.localStorage.get('locationCode');
    const childId = this.localStorage.get('CHILD_ID');
    const parentId = this.localStorage.get('PARENT_ID');
    const customerId = this.localStorage.get('customerId');

    switch (name) {
      case 'Product General':
        url = skuCode ? url.replace(':skuCode', skuCode) : url.replace(':skuCode/', '');
        break;
      case 'Product Price':
      case 'Product Images':
      case 'Product Meta Information':
      case 'Product Inventory':
      case 'Product Categories':
      case 'Product Related Products':
      case 'Product Up sells':
      case 'Related Products':
      case 'Product Cross sells':
        url = skuCode ? url.replace(':skuCode', skuCode) : '/product/general';
        break;
      case 'Category Information':
        url = childId ? url.replace(':childId', childId) : url.replace(':childId/', '');
        url = parentId ? url.replace(':parentId', parentId) : url.replace(':parentId/', '');
      case 'Meta Information':
      case 'Category Products':
        url = childId ? url.replace(':childId', childId) : 'category/category-information';
        url = parentId ? url.replace(':parentId', parentId) : 'category/category-information';
        break;
      case 'Location Info':
        url = locationCode ? url.replace(':locationCode', locationCode) : url.replace(':locationCode/', '');
      case 'Location Address':
      case 'Location Inventory':
        url = locationCode ? url.replace(':locationCode', locationCode) : 'location/location-info';
        break;
      case 'Customer Information':
      case 'Customer VBD':
      case 'Customer Edit AccountInfo':
      case 'Customer Edit Addresses':
      case 'Customer Orders':
      case 'Customer ShoppingCart':
      case 'Customer Wishlist': 
      url = customerId ? url.replace(':customerId', customerId) : '/customer/account-info';
        break;
      default:
    }
    this.router.navigate([url])
  }

  ngOnDestroy() {
    this.subscribedRouter.unsubscribe()
  }

}
