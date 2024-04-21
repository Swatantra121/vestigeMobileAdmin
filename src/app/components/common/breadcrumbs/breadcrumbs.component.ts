import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, Event, NavigationEnd } from '@angular/router';
import * as breadcrumbType from './breadcrumb.items'
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  subscribedRouter;
  showBreadcrumb: boolean = false;
  breadcrumbItems = [];

  constructor(private routerService: RouterService) { }

  ngOnInit() {
    this.getActiveMenuItem();
  }

  getActiveMenuItem() {
    this.subscribedRouter = this.routerService.activeRouteUrl.subscribe((data) => {
      this.setBreadcrumbs(data.title);
    });
  }

  setBreadcrumbs(title) {
    switch (title) {
      case 'Product Setting':
      case 'Product General':
      case 'Product Price':
      case 'Product Images':
      case 'Product Meta Information':
      case 'Product Inventory':
      case 'Product Categories':
      case 'Product Related products':
      case 'Related Products':
      case 'Product Up sells':
      case 'Product Cross sells':
        this.breadcrumbItems = breadcrumbType.PRODUCT_BREADCRUMB;
        break;
      case 'Location Inventory':
      case 'Location Address':
      case 'Location Info':
        this.breadcrumbItems = breadcrumbType.LOCATION_BREADCRUMB;
        break;
      case 'Category Information':
      case 'Meta Information':
      case 'Category Products':
        this.breadcrumbItems = breadcrumbType.CATEGORY_BREADCRUMB;
        break;
      case 'View Invoice':
        this.breadcrumbItems = breadcrumbType.INVOICE_BREADCRUMB;
        break;
      case 'Customer Addresses':
      case 'Customer AccountInfo':
      case 'Customer Edit Addresses':
      case 'Customer Edit AccountInfo':
      case 'Customer Information':
      case 'Customer VBD':
      case 'Customer Orders':
      case 'Customer ShoppingCart':
      case 'Customer Wishlist':
        this.breadcrumbItems = breadcrumbType.CUSTOMER_BREADCRUMB;
        break;
      default:
    }
  }

  ngOnDestroy() {
    this.subscribedRouter.unsubscribe();
  }

}
