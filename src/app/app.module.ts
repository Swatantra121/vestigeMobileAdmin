import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from 'src/app/routes/app-routing.module';
import 'hammerjs';
import { OwlModule } from 'ngx-owl-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AdminPanelMaterialModule } from './material.module';
import { SharedModule } from 'src/app/components/common/shared.module';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';


//importing all main components
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { ResetPasswordComponent } from 'src/app/components/auth/reset-password/reset-password.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { SideMenuComponent } from 'src/app/components/common/side-menu/side-menu.component';
import { HeaderComponent } from 'src/app/components/common/header/header.component';
import { BreadcrumbsComponent } from 'src/app/components/common/breadcrumbs/breadcrumbs.component';
import { CommingSoonComponent } from 'src/app/components/common/comming-soon/comming-soon.component';
import { ErrorPageComponent } from 'src/app/components/common/error-page/error-page.component';
// import { CatelogueAccordianComponent } from 'src/app/components/common/catelogue-accordian/catelogue-accordian.component';

//importing all services from shared folder
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { CategoryService } from 'src/app/services/category.service';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';
import { LocationService } from 'src/app/services/location.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RouterService } from 'src/app/services/router.service';
import { AuthGuardService as AuthGuard, LoginFlowGuard, DashboardFlowGuard, ResetFlowGuard } from 'src/app/guards/auth-guard.service';
import { ModelBindingService } from 'src/app/services/modelBinding.service';

//importing components modules
import { CustomersModule } from 'src/app/components/customers/customers.module';
import { ProductModule } from 'src/app/components/product/product.module';
import { LocationModule } from 'src/app/components/location/location.module';
import { CategoryModule } from 'src/app/components/category/category.module';
import { InvoiceModule } from 'src/app/components/invoice/invoice.module';
import { AboutVBDModule } from 'src/app/components/about-vbd/about-vbd.module';
import { BannerModule } from 'src/app/components/banner/banner.module';
import { VideosModule } from 'src/app/components/videos/videos.module';

//importing all pipes used in the Admin Panel
import { PipesModule } from 'src/app/pipes/pipes.module';
import { LocalStorageService } from 'src/app/services/local-Storage';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { PushNotificationComponent } from 'src/app/components/push-notification/push-notification.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    DashboardComponent,
    SideMenuComponent,
    HeaderComponent,
    AuthComponent,
    BreadcrumbsComponent,
    CommingSoonComponent,
    ErrorPageComponent,
     PushNotificationComponent


    // CatelogueAccordianComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminPanelMaterialModule,
    CustomersModule,
    ProductModule,
    LocationModule,
    CategoryModule,
    PipesModule.forRoot(),
    SharedModule,
    InvoiceModule,
    AboutVBDModule,
    BannerModule,
    VideosModule,
    OwlModule,
    InvoiceModule,
    AngularEditorModule,
    //  PushNotificationComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    AuthService,
    ApiService,
    AuthGuard,
    AlertService,
    CategoryService,
    RouterService,
    ProductService,
    LoginFlowGuard,
    DashboardFlowGuard,
    ResetFlowGuard,
    LocationService,
    CustomerService,
    LocalStorageService,
    ModelBindingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
