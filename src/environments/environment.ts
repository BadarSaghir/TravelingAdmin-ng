// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:4000/api/",
  firebase: {
    apiKey: "AIzaSyDJhjEN0HLuC-JqyU3UK3ECJrHXYXSgaDk",
    authDomain: "http://localhost:4200", //"thepaktours-d2ddf.firebaseapp.com",
    projectId: "thepaktours-d2ddf",
    databaseURL: "https://thepaktours-d2ddf.firebaseio.com",
    storageBucket: "thepaktours-d2ddf.appspot.com",
    messagingSenderId: "328369922697",
    appId: "1:328369922697:web:dc3fc1c8409e3026361c58",
    measurementId: "G-KNJ5VP7PJN",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
