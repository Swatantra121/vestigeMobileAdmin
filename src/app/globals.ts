export const regEx = {
    distributorId: /^[0-9]{8}$/,
    mobile: '[6-9]{1}[0-9]{9}',
    pincode: /[0123456789]\d{5}/,
    email: /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
    nameWithSpecialCharacters: /^[a-zA-Z\s,'-]/,
    name: /^[a-zA-Z ]+$/,
    gstNumber: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    url:/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
}

export const VESTIGE_ADMIN_PANEL_KEYS = {
    VESTIGE_ENCRYPTION_KEY: '9mMPIi1LIuBX59nphrzlVg==',
}

export const STORAGE_KEYS = {
    TOKEN_KEY: 'VESTIGE_TOKEN',
    DISTRIBUTOR_ID_KEY: 'DISTRIBUTOR_ID',
    COUNTRY_LIST: 'COUNTRY_LIST',
    CUSTOMER_GROUP_SELECTION: 'CUSTOMER_GROUP_SELECTION',
    SKUCODE: 'SKUCODE',
    CMS_ID_KEY: 'CMS_ID'
}