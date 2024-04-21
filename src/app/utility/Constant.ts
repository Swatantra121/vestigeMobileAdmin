
export const SUB_ROUTE = {
    DASHBOARD: 'dashboard',
    CATALOGUE: 'catalogue',
    PRODUCT: 'product',
    LOCATIONS: 'location',
    PROMOTIONS: 'promotions',
    CUSTOMERS: 'customers',
    SALES: 'sales',
    REPORTS: 'reports',
    PERMISSIONS: 'permissions',
    ABOUT_VBD: 'about_vbd',
};

export const VESTIGE_ADMIN_PANEL_ROUTE = {
    PRODUCT_CATALOGUE: {
        PRICE: '\product/price'
    },
    CATEGORY_CATALOGUE: {
        CATEGORY_INFORMATION: 'category/category-information',
        META_INFORMATION: 'category/meta-information',
        CATEGORY_PRODUCTS: 'category/category-products'
    }
};

export const WEEK_DAY_NAME = {
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
    SUNDAY: 'Sunday',
    INCLUDE_ALL: 'Include Lunch for all Days',
};

export const STATUS_LIST = [
    { value: true, key: 'Yes' },
    { value: false, key: 'No' },
];

export const WEEK_DAY_LIST = [
    { key: 'Monday', value: 'Monday' },
    { key: 'Tuesday', value: 'Tuesday' },
    { key: 'Wednesday', value: 'Wednesday' },
    { key: 'Thursday', value: 'Thursday' },
    { key: 'Friday', value: 'Friday' },
    { key: 'Saturday', value: 'Saturday' },
    { key: 'Sunday', value: 'Sunday' },
    { key: 'Include Lunch for all Days', value: 'Include Lunch All Days' },
];

/**
 * @description Month January-December
 */
export const MONTH_LIST = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
];

export const TIME_INTERVAL = ['00', '15', '30', '45'];

export const IS_CUSTOMER_ACTIVE_LIST = {
    1: 'Created',
    2: 'Active',
    3: 'Terminated',
    4: 'On Hold'
};

export const VISIBILITY_LIST = [
    { key: 'Enabled', value: true },
    { key: 'Disabled', value: false },
];

export const VESTIGE_ADMIN_PANEL_KEYS = {
    VESTIGE_ENCRYPTION_KEY: '9mMPIi1LIuBX59nphrzlVg==',
};

export const INVENTORY_KEYS = [
    { value: 0, key: '--Please Select--' },
    { value: true, key: 'True' },
    { value: false, key: 'False' },
];

export const BRAND_LIST = [
    '--Please Select--', 'Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'
];

export const UOM_LIST = [
    'gm', 'Kg', 'L', 'ml'
];

export const TAX_CATEGORY_LIST = [
    '--Please Select--',
    'None',
    'Taxable Goods',
    'Shipping'
];

export const INVENTORY_TYPE_LIST = [
    'Outright', 'JIT', 'SOR', 'Drop Ship'
];

export const SUPPORTED_FILES_EXTS = [
    'application/jpg', 'image/png',
    'image/jpeg',
];
export const CONFIG_SETTING_LIST = [
    { key: 'Yes', value: true },
    { key: 'No', value: false }
];

export const STOCK_MANAGEMENT_LIST = [
    { key: 'Enable', value: true },
    { key: 'Disable', value: false }
];

export const PRODUCT_MAX_IMAGE = 10;

export const PRODUCT_IMAGE_FILE_SIZE = 1024 * 1024;       // 1 mb

/**
 * @description alert type { error, success, warning }
 */
export enum ALERT_TYPE {
    ERROR,
    SUCCESS,
    WARNING
}


export const PRODUCT_SEARCH_BY = [
    { key: 'Name', value: 'productName' },
    { key: 'Id', value: 'id' },
    { key: 'SkuCode', value: 'skuCode' },
    { key: 'None', value: null }];
