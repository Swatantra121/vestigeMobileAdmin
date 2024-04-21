// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_URLS_ENDPOINT: 'http://13.232.167.44:8080/',
  API_URLS_ENDPOINT:  'http://vstg-gateway-prod-1532961163.ap-south-1.elb.amazonaws.com/',
  // API_URLS_ENDPOINT: 'http://192.168.14.126:8080/',
  // API_URLS_ENDPOINT: 'http://115.249.4.195:8080/',

  // API_URLS_ENDPOINT: 'http://vestige-uat-gateway-alb-1276327416.ap-south-1.elb.amazonaws.com:8084/'
  
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
