import { VESTIGE_ADMIN_PANEL_ROUTE } from 'src/app/utility/Constant';

export const MAIN_MENU_ITEM = [{
  itemName: 'Dashboard',
  name: 'Dashboard',
  link: '/dashboard',
  class: 'dashboard-icon'
},

{
  itemName: 'Catalogue',
  class: 'catalogue-icon down-arrow',
  active: false,
  isOpen: false,
  subItems: [{
    itemName: 'Products',
    name: 'Products',
    link: '/product',
    class: 'icon-none'
  }, {
    itemName: 'Categories',
    name: 'Catalogue',
    link: '/catalogue/categories',
    class: 'icon-none'
  }]
},
{
  itemName: 'Locations',
  name: 'Location List',
  link: '/location',
  class: 'location-icon',
},
{
  itemName: 'Push Notification',
  name: 'Push Notification',
  link: '/push-notification',
  class: 'promotion-icon'
},
{
  itemName: 'Promotions',
  name: 'Product General',
  link: '/ds/cl/ncl',
  class: 'promotion-icon'
},
{
  itemName: 'Customers',
  name: 'Customers',
  link: '/customers',
  class: 'customer-icon'
},
{
  itemName: 'Sales',
  class: 'catalogue-icon down-arrow',
  active: false,
  isOpen: false,
  subItems: [{
    itemName: 'Orders',
    name: 'Orders',
    link: '/invoice/invoice-list',
    class: 'icon-none'
  }, {
    itemName: 'Invoice',
    name: 'Invoice',
    link: '/invoices',
    class: 'icon-none'
  }, {
    itemName: 'Shipment',
    name: 'Shipment',
    link: '/fdsfsd',
    class: 'icon-none'
  }]
},
{
  itemName: 'Reports',
  name: 'Product General',
  link: '/ds/billing',
  class: 'reports-icon'
},
{
  itemName: 'Permissions',
  name: 'Product General',
  link: '/ds/billing',
  class: 'permission-icon'
},
{
  itemName: 'About VBD',
  class: 'catalogue-icon down-arrow',
  active: false,
  isOpen: false,
  subItems: [{
    itemName: 'CMS',
    name: 'AboutVBD Listing',
    link: '/about-vbd',
    class: 'icon-none'
  }, {
    itemName: 'Banners',
    name: 'Banner',
    link: '/banners',
    class: 'icon-none'
  }, {
    itemName: 'Videos',
    name: 'Videos',
    link: '/videos',
    class: 'icon-none'
  }]
},];

export const PRODUCT_SETTING_MENU = [{
  itemName: 'Product Setting',
  link: '/product/setting',
  class: 'icon-none'
}];

export const PRODUCT_INFO_MENU = [{
  itemName: 'Product Setting',
  name: 'Product Setting',
  link: '/product/setting',
  class: 'icon-none'
},
{
  itemName: 'Product Info',
  class: 'icon-none',
  active: false,
  isOpen: false,
  hideArrow: true,
  subItems: [{
    itemName: 'General *',
    name: 'Product General',
    link: '/product/:skuCode/general',
    class: 'icon-none'
  }, {
    itemName: 'Prices *',
    name: 'Product Price',
    link: '/product/:skuCode/price',
    class: 'icon-none'
  }, {
    itemName: 'Images *',
    name: 'Product Images',
    link: '/product/:skuCode/images',
    class: 'icon-none'
  }, {
    itemName: 'Meta Information',
    name: 'Product Meta Information',
    link: '/product/:skuCode/meta-information',
    class: 'icon-none'
  }, {
    itemName: 'Inventory *',
    name: 'Product Inventory',
    link: '/product/:skuCode/inventory',
    class: 'icon-none'
  }, {
    itemName: 'Categories *',
    name: 'Product Categories',
    link: '/product/:skuCode/categories',
    class: 'icon-none'
  }, {
    itemName: 'Related Products',
    name: 'Related Products',
    link: '/product/:skuCode/related-products',
    class: 'icon-none'
  }, {
    itemName: 'Up-Sells',
    name: 'Product Up sells',
    link: '/product/:skuCode/up-sells',
    class: 'icon-none'
  }, {
    itemName: 'Cross-Sells',
    name: 'Product Cross sells',
    link: '/product/:skuCode/cross-sells',
    class: 'icon-none'
  }]
}];

export const CATEGORY_INFO_MENU = [{
  itemName: 'Category Info',
  name: 'Product Related Products',
  class: 'icon-none',
  active: false,
  isOpen: false,
  hideArrow: true,
  subItems: [{
    itemName: 'Category Information *',
    name: 'Category Information',
    link: '/category/:childId/:parentId/category-information',
    class: 'icon-none'
  }, {
    itemName: 'Meta Information',
    name: 'Meta Information',
    link: '/category/:childId/:parentId/meta-information',
    class: 'icon-none'
  }, {
    itemName: 'Category Products',
    name: 'Category Products',
    link: '/category/:childId/:parentId/category-products',
    class: 'icon-none'
  }]
}];

export const LOCATION_MENU = [
  {
    itemName: 'Location Information',
    name: 'Location Info',
    link: '/location/:locationCode/location-info',
    class: 'icon-none'
  }, {
    itemName: 'Address and Hours *',
    name: 'Location Address',
    link: '/location/:locationCode/location-address',
    class: 'icon-none'
  }, {
    itemName: 'Inventory Information',
    name: 'Location Inventory',
    link: '/location/:locationCode/location-inventory',
    class: 'icon-none'
  }];
export const CUSTOMERS_INFO_MENU = [
  {
    itemName: 'Customer Information',
    name: 'Customer Information',
    link: '/customer/:customerId/customer-info',
    class: 'icon-none'
  }, {
    itemName: 'VBD Wallet',
    name: 'Customer VBD',
    link: '/customer/:customerId/vbd',
    class: 'icon-none'
  }, {
    itemName: 'Account Information',
    name: 'Customer Edit AccountInfo',
    link: '/customer/:customerId/account-info',
    class: 'icon-none'
  }, {
    itemName: 'Addresses',
    name: 'Customer Edit Addresses',
    link: '/customer/:customerId/addresses',
    class: 'icon-none'
  }, {
    itemName: 'Orders',
    name: 'Customer Orders',
    link: '/customer/:customerId/orders',
    class: 'icon-none'
  }, {
    itemName: 'Shopping Cart',
    name: 'Customer ShoppingCart',
    link: '/customer/:customerId/shopping-cart',
    class: 'icon-none'
  }, {
    itemName: 'Wishlist',
    name: 'Customer Wishlist',
    link: '/customer/:customerId/wishlist',
    class: 'icon-none'
  }];
export const CUSTOMERS_ADD_MENU = [
  {
    itemName: 'Account Information*',
    name: 'Customer AccountInfo',
    link: 'customer/account-info',
    class: 'icon-none'
  }, {
    itemName: 'Address*',
    name: 'Customer Addresses',
    link: 'customer/addresses',
    class: 'icon-none'
  }];
  export const INVOICES_VIEW_MENU = [
    {
      itemName: 'Invoice',
      name: 'View Invoice',
      link: '/invoices/view-invoice',
      class: 'icon-none'
    }, {
      itemName: 'Comment History',
      name: 'View Invoice',
      link: '/invoices/view-invoice',
      class: 'icon-none'
    }];
    export const ABOUT_VBD_MENU = [
      {
        itemName: 'Page Information*',
        name: 'AboutVBD PageInfo',
        link: '/about-vbd/page-info',
        class: 'icon-none'
      }, {
        itemName: 'Content*',
        name: 'AboutVBD Content',
        link: '/about-vbd/content-info',
        class: 'icon-none'
      }, {
        itemName: 'Meta Information*',
        name: 'AboutVBD MetaInfo',
        link: '/about-vbd/meta-info',
        class: 'icon-none'
      }];
    export const BANNER_MENU = [
        {
          itemName: 'Banner Information*',
          name: 'Banner Info',
          link: '/banners/banner-info',
          class: 'icon-none'
        }];
