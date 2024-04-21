import { Component, ElementRef, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterService } from 'src/app/services/router.service';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Alert } from 'src/app/models/Alert';
import { ALERT_TYPE } from 'src/app/utility/Constant';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  showHeader = false;
  openMenu = false;
  showMenuComponent = false;
  showBreadcrumb = false;
  currentRoute: any;
  subscribedRouter;
  showLoader: Boolean = false;
  alertMessage: Array<Alert> = [];

  constructor(
    private el: ElementRef,
    private routerService: RouterService,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private alertService: AlertService,
    private loaderService: LoaderService) {
    this.subscribeAlertMsg();
    this.activeLoader();
  }

  ngOnInit() {
    // Activate Route screening, pageTitle, sideMenu and Breadcrumb.
    this.routerService.ActivateRouteService();

    this.routerService.activeRouteUrl.subscribe((data) => {

      switch (data.url) {
        case '/login':
        case '/reset':
        case '/error':
          this.el.nativeElement.parentNode.style = 'background: linear-gradient(to right, #06beb6, #48b1bf)';
          this.showHeader = false;
          this.showMenuComponent = false;
          break;
        default:
          this.el.nativeElement.parentNode.style = 'background: #ffffff';
          this.showHeader = true;
          this.showMenuComponent = true;
      }
      switch (data.title) {
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
        case 'Category Information':
        case 'Meta Information':
        case 'Category Products':
        case 'Location Inventory':
        case 'Location Info':
        case 'Location Address':
        case 'Customer Addresses':
        case 'Customer AccountInfo':
        case 'Customer Edit Addresses':
        case 'Customer Edit AccountInfo':
        case 'Customer Information':
        case 'Customer VBD':
        case 'Customer Orders':
        case 'Customer ShoppingCart':
        case 'Customer Wishlist':
          this.showBreadcrumb = true;
          break;
        default:
          this.showBreadcrumb = false;
      }
    });
  }

  /**
   * @description show alert messages
   */
  subscribeAlertMsg() {
    this.alertService.getAlertMessage().subscribe((alert: Alert) => {
      this.snackBar.open(alert.message, 'Close', {
        duration: 2000,
        verticalPosition: 'top'
      });
    });
  }

  /**
   * @description show loader in the application
   */
  activeLoader() {
    this.loaderService.showLoader().subscribe((loader) => setTimeout(() => {
      if (loader) {
        this.showLoader = loader.loader;
      } else {
        this.showLoader = false;
      }
    }, 0));
  }

  ngOnDestroy() {
    // Deactivate Route screening, pageTitle, sideMenu and Breadcrumb.
    this.routerService.DeactivateRouteService();
  }
}
