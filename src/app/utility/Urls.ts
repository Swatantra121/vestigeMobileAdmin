import { environment } from 'src/environments/environment';

  // All API_URLS used in the Vestige Admin Panel

const API_PREFIX = {
  // UAT
    // Cart: ('gateway-0.0.1-SNAPSHOT/cart/'),
    // Product: ('gateway-0.0.1-SNAPSHOT/product/'),
    // Notification: ('gateway-0.0.1-SNAPSHOT/notification/'),
    // Promotion: ('gateway-0.0.1-SNAPSHOT/promotion/'),
    // Order: ('gateway-0.0.1-SNAPSHOT/order/'),
    // Common: ('gateway-0.0.1-SNAPSHOT/common/'),
    // Profile: ('gateway-0.0.1-SNAPSHOT/profile/'),
    // Wishlist: ('gateway-0.0.1-SNAPSHOT/product/'),
    // Uaa: ('gateway-0.0.1-SNAPSHOT/uaa/'),
    // OTP: (''),
    // Normal: ('gateway-0.0.1-SNAPSHOT/')

    // DEV
      Cart: (''),
      Product: (''),
      Notification: (''),
      Promotion: (''),
      Order: (''),
      Common: (''),
      Profile: (''),
      Uaa: (''),
      OTP: (''),
      Wishlist: (''),
      Normal: (''),
      pushNotification:(''),
      imageUploadurl: (''),
      checkDistId: ('')
  };

  export const ServiceEnum = {
    checkDistId:(environment.API_URLS_ENDPOINT + API_PREFIX.checkDistId + 'notification/api/v1/push-notifications/valid/distributorId'/*:ServiceType*/),
    imageUploadurl: (environment.API_URLS_ENDPOINT + API_PREFIX.imageUploadurl + 'common/api/v1/file-upload'/*:ServiceType*/),
    pushNotification: (environment.API_URLS_ENDPOINT + API_PREFIX.pushNotification + 'notification/api/v1/notification/push'/*:ServiceType*/),
    Otp: (environment.API_URLS_ENDPOINT + API_PREFIX.OTP + 'uaa-0.0.1-SNAPSHOT/api/v1/send/otp/'/*:ServiceType*/),
    Login: (environment.API_URLS_ENDPOINT + API_PREFIX.Normal + 'auth/training-login'/*:ServiceType*/),
    Distributor: (environment.API_URLS_ENDPOINT + API_PREFIX.Profile + 'profile-0.0.1-SNAPSHOT/api/v1/distributors'/*:ServiceType*/),
    CountryList: (environment.API_URLS_ENDPOINT + API_PREFIX.Common + 'common-0.0.1-SNAPSHOT/api/v1/countries'),
    StateList: (environment.API_URLS_ENDPOINT + API_PREFIX.Common + 'common-0.0.1-SNAPSHOT/api/v1/states/country/'),
    CityList: (environment.API_URLS_ENDPOINT + API_PREFIX.Common + 'common-0.0.1-SNAPSHOT/api/v1/cities/state/'),
    CountryStateCity: (environment.API_URLS_ENDPOINT + API_PREFIX.Common + 'common-0.0.1-SNAPSHOT/api/v1/pincodes/'),
    Location: (environment.API_URLS_ENDPOINT +API_PREFIX.Product + 'productvbd-0.0.1-SNAPSHOT/api/v1/locations'),
    Products: (environment.API_URLS_ENDPOINT + API_PREFIX.Product + 'productvbd-0.0.1-SNAPSHOT/api/v1/products'),
    Category: (environment.API_URLS_ENDPOINT + API_PREFIX.Product + 'productvbd-0.0.1-SNAPSHOT/api/v1/categories'),
    Brands: (environment.API_URLS_ENDPOINT + API_PREFIX.Product + 'productvbd-0.0.1-SNAPSHOT/api/v1/brands'),
    // CategoryUploadImage: (environment.API_URLS_ENDPOINT + API_PREFIX.Product+ 'productvbd-0.0.1-SNAPSHOT/api/v1/category/'),
  }

  export const DistributorServiceEnum = { 
    RandomDistributor: ('random'),
    ProductSetting: ('product-setting'),
    WarehouseTypes: ('warehouse-types'),
    CustomerGroupSelection: ('customer-group-selection'),
    StoreViewSelection: ('store-view-selection'),
    BackorderSelection: ('location-backorder-selection'),
    ImageDetails: ('image?skuCode='),
    ProductInventory: ('inventory'),
    GeneralInfo: ('general-info'),
    PriceInfo: ('price'),
    MetaInformation: ('meta-info'),
    RelatedProduct: ('related-product?skuCode=S001'),
    UpSellsProduct: ('up-sells?skuCode=S001'),
    CrossSellsProduct: ('up-sells?skuCode=S001'),
    ProductType: ('product-type'),
    UploadImages: ('upload-image?skuCode='),
    SubCategories: ('get?childId='),
    Category: ('link?skuCode='),
    CategoryProducts: ('link?childId='),
    PublishCategory: ('publish?isPublish='),
    SearchCategory: ('_search?'),
    ActiveFor: ('active-for')
  }
