import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// importing all main components
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ResetPasswordComponent } from 'src/app/components/auth/reset-password/reset-password.component';

// import all customers catalogues's components
import { CustomersComponent } from 'src/app/components/customers/customers/customers.component';
import { CustomerInfoComponent } from 'src/app/components/customers/customer-info/customer-info.component';
import { VbdWalletComponent } from 'src/app/components/customers/vbd-wallet/vbd-wallet.component';
import { AccountInfoComponent } from 'src/app/components/customers/account-info/account-info.component';
import { AddressesComponent } from 'src/app/components/customers/addresses/addresses.component';
import { OrdersComponent } from 'src/app/components/customers/orders/orders.component';
import { ShoppingCartComponent } from 'src/app/components/customers/shopping-cart/shopping-cart.component';
import { WishlistComponent } from 'src/app/components/customers/wishlist/wishlist.component';
// import { AddAddressesComponent } from 'src/app/components/customers/add-addresses/add-addresses.component';



// import all product catalogues's components
import { GeneralComponent } from 'src/app/components/product/general/general.component';
import { ProductSettingComponent } from 'src/app/components/product/product-setting/product-setting.component';
import { PriceComponent } from 'src/app/components/product/price/price.component';
import { ProductMetaInfoComponent } from 'src/app/components/product/product-meta-info/product-meta-info.component';
import { ProductInventoryComponent } from 'src/app/components/product/product-inventory/product-inventory.component';
import { ProductCategoriesComponent } from 'src/app/components/product/product-categories/product-categories.component';
import { RelatedProductsComponent } from 'src/app/components/product/related-products/related-products.component';
import { UpSellsComponent } from 'src/app/components/product/up-sells/up-sells.component';
import { CrossSellsComponent } from 'src/app/components/product/cross-sells/cross-sells.component';
import { ImagesComponent } from 'src/app/components/product/images/images.component';
import { ProductListingComponent } from 'src/app/components/product/product-listing/product-listing.component';

// import all category catalogues's components
import { CategoryInformationComponent } from 'src/app/components/category/category-information/category-information.component';
import { MetaInformationComponent } from 'src/app/components/category/meta-information/meta-information.component';
import { CategoryProductsComponent } from 'src/app/components/category/category-products/category-products.component';
import { CatalogueComponent } from 'src/app/components/category/catalogue/catalogue.component';


// importing location catelogue's components
import { LocationListingComponent } from 'src/app/components/location/location-listing/location-listing.component';
import { InformationComponent } from 'src/app/components/location/information/information.component';
import { AddressHoursComponent } from 'src/app/components/location/address-hours/address-hours.component';
import { InventoryComponent } from 'src/app/components/location/inventory/inventory.component';


// importing invoice components
import { InvoiceListingComponent } from 'src/app/components/invoice/invoice-listing/invoice-listing.component';
import { ViewInvoiceComponent } from 'src/app/components/invoice/view-invoice/view-invoice.component';

// importing AboutVBD catelogue's components
import { AboutVBDListComponent } from 'src/app/components/about-vbd/about-vbd-list/about-vbd-list.component';
import { ContentComponent } from 'src/app/components/about-vbd/content/content.component';
import { AboutVBDmetaComponent } from 'src/app/components/about-vbd/about-vbdmeta/about-vbdmeta.component';
import { PageInformationComponent } from 'src/app/components/about-vbd/page-information/page-information.component';

// importing banner components
import { BannersComponent } from 'src/app/components/banner/banners/banners.component';
import { BannerInfoComponent } from 'src/app/components/banner/banner-info/banner-info.component';

import { VideoComponent } from 'src/app/components/videos/video/video.component';


import { AuthGuardService as AuthGuard, LoginFlowGuard, DashboardFlowGuard, ResetFlowGuard } from 'src/app/guards/auth-guard.service';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { ErrorPageComponent } from 'src/app/components/common/error-page/error-page.component';
import { CommingSoonComponent } from 'src/app/components/common/comming-soon/comming-soon.component';
import { PushNotificationComponent } from 'src/app/components/push-notification/push-notification.component';

export const router: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginFlowGuard],
        data: { title: 'Login' }
      },
      {
        path: 'reset',
        component: ResetPasswordComponent,
        canActivate: [ResetFlowGuard],
        data: { title: 'Reset' }
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Dashboard' }
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Error' }
  },
  {
    path: 'comming-soon',
    component: CommingSoonComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Comming Soon' }
  },
  {
    path: 'push-notification',
    component: PushNotificationComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Push Notification' }
  },
  {
    path: 'product',
    component: ProductListingComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Products' }
  },
  {
    path: 'product/setting',
    component: ProductSettingComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Product Setting' }
  },
  {
    path: 'product/general',
    component: GeneralComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Product General' }
  },
  {
    path: 'product/:skuCode/general',
    component: GeneralComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Product General' }
  },
  {
    path: 'product/:skuCode/price',
    component: PriceComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Product Price' }
  },
  {
    path: 'product/:skuCode/meta-information',
    component: ProductMetaInfoComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Product Meta Information' }
  },
  {
    path: 'product/:skuCode/inventory',
    component: ProductInventoryComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Product Inventory' }
  },
  {
    path: 'product/:skuCode/categories',
    component: ProductCategoriesComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Product Categories' }
  },
  {
    path: 'product/:skuCode/related-products',
    component: RelatedProductsComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Related Products' }
  },
  {
    path: 'product/:skuCode/up-sells',
    component: UpSellsComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Product Up sells' }
  },
  {
    path: 'product/:skuCode/cross-sells',
    component: CrossSellsComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Product Cross sells' }
  },
  {
    path: 'product/:skuCode/images',
    component: ImagesComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Product Images' }
  },
  {
    path: 'catalogue/categories',
    component: CatalogueComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Catalogue' }
  },
  {
    path: 'category/category-information',
    component: CategoryInformationComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Category Information' }
  },
  {
    path: 'category/:childId/category-information',
    component: CategoryInformationComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Category Information' }
  },
  {
    path: 'category/:childId/:parentId/category-information',
    component: CategoryInformationComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Category Information' }
  },
  {
    path: 'category/:childId/meta-information',
    component: MetaInformationComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Meta Information' }
  },
  {
    path: 'category/:childId/:parentId/meta-information',
    component: MetaInformationComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Meta Information' }
  },
  {
    path: 'category/:childId/category-products',
    component: CategoryProductsComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Category Products' }
  },
  {
    path: 'category/:childId/:parentId/category-products',
    component: CategoryProductsComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Category Products' }
  },
  {
    path: 'location',
    component: LocationListingComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Location List' }
  },
  {
    path: 'location/location-info',
    component: InformationComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Location Info' }
  },
  {
    path: 'location/:locationCode/location-info',
    component: InformationComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Location Info' }
  },
  {
    path: 'location/:locationCode/location-address',
    component: AddressHoursComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Location Address' }
  },
  {
    path: 'location/:locationCode/location-inventory',
    component: InventoryComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Location Inventory' }
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Customers' }
  },
  {
    path: 'customer/customer-info',
    component: CustomerInfoComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Customer Information' }
  },
  {
    path: 'customer/vbd',
    component: VbdWalletComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Customer VBD' }
  },
  {
    path: 'customer/orders',
    component: OrdersComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Customer Orders' }
  },
  {
    path: 'customer/shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Customer ShoppingCart' }
  },
  {
    path: 'customer/wishlist',
    component: WishlistComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Customer Wishlist' }
  },
  {
    path: 'customer/addresses',
    component: AddressesComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Customer Addresses' }
  },
  {
    path: 'customer/account-info',
    component: AccountInfoComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Customer AccountInfo' }
  },
  {
    path: 'customer/:customerId/addresses',
    component: AddressesComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Customer Edit Addresses' }
  },
  {
    path: 'customer/:customerId/account-info',
    component: AccountInfoComponent,
    canActivate: [DashboardFlowGuard],
    data: { title: 'Customer Edit AccountInfo' }
  },
  {
    path: 'invoices',
    component: InvoiceListingComponent,
    data: { title: 'Invoice Listing' }
  },
  {
    path: 'invoices/view-invoice',
    component: ViewInvoiceComponent,
    data: { title: 'View Invoice' }
  },
  {
    path: 'about-vbd',
    component: AboutVBDListComponent,
    data: { title: 'AboutVBD Listing' }
  },
  {
    path: 'about-vbd/content-info',
    component: ContentComponent,
    data: { title: 'AboutVBD Content' }
  },
  {
    path: 'about-vbd/meta-info',
    component: AboutVBDmetaComponent,
    data: { title: 'AboutVBD MetaInfo' }
  },
  {
    path: 'about-vbd/page-info',
    component: PageInformationComponent,
    data: { title: 'AboutVBD PageInfo' }
  },
  {
    path: 'banners',
    component: BannersComponent,
    data: { title: 'Banner' }
  },
  {
    path: 'banners/banner-info',
    component: BannerInfoComponent,
    data: { title: 'Banner Info' }
  },
  {
    path: 'videos',
    component: VideoComponent,
    data: { title: 'Videos' }
  },
  { path: '**', redirectTo: 'comming-soon' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      router,
      // { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
