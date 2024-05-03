import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-Storage';
import * as myGlobals from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authToken: String = '';
  distributorId: String = '';

  constructor(private http: HttpClient,
    private localStorage: LocalStorageService) { }

  /**
   * @function getRequest if token is available then it sends request with header otherwise not
   * @description making headers
   */
  getRequest() {
    let authToken = this.localStorage.get(myGlobals.STORAGE_KEYS.TOKEN_KEY)
    //Do not remove this
    // let authToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMTAwMDAwOCIsInNjb3BlIjpbIm9wZW5pZCJdLCJuYW1lIjoiUkFNRVNIIFBVTkhBTkkiLCJleHAiOjE1NTEwNzQ5OTksImlhdCI6MTU1MDQ3MDE5OSwianRpIjoiNDA1OWRlYjctN2I3Zi00ZjU5LWI1MGMtNTA0MTQzMDE1MzFkIiwiYXV0aG9yaXRpZXMiOltdLCJjbGllbnRfaWQiOiJ3ZWJfYXBwIn0.kIcE2uj4Y2clCpkLSuwVP_EijQm_np9Oqm4bAc2uVcTdTtERevx3wtZ52_zxEjlCqOie5GZx5KezJeGOwIiQrT2XWKBjiDgyrNeLfmXKnc8JrLSyBzEPRFgDQ_yS39yS8a8wG9MFoA8q61RBF3WztqZgH1T-F-01dMVF55zMc2BqX7W4C_IsCLZV13Z5XI_dJme43b62dBRAiqZyyv0TuTwJmu0IrGe9W481JDIjPZ3p7jqQ_5ptVhBbdEzpRrYt_nAJgqaHcrWrpe414zFM6iOGoZPL8G29glIMH40mb3JWx5YSsKoXr1RQ70umKv75z1hdgNdvRvO-bwMUiP75gA'

    let httpRequest = {};
    if (authToken) {
      httpRequest = {
        headers: new HttpHeaders({
           'Accept':'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${authToken}`,
          // 'distributorId': distributorId
        })
      };
    } else {
      httpRequest = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        })
      };
    }
    return httpRequest;
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  post(path: string, body: Object = {}): Observable<any> {
    const request = this.getRequest();
    return this.http.post(path, body, request)
      .pipe(catchError(this.formatErrors));
  }

  get(path: string): Observable<any> {
    const request = this.getRequest();
    return this.http.get(path, request)
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    const request = this.getRequest();
    return this.http.put(path, body, request)
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string, body: Object = {}): Observable<any> {
    const request = this.getRequest();
    return this.http.delete(path, request)
      .pipe(catchError(this.formatErrors));
  }

  uploadMulitpleFile(path: string, files) {
    const uploadData = new FormData();
    for (const file of files) {
      uploadData.append('files', file, file.name);
    }
    const config = {
      headers: new HttpHeaders({
        'Authorization': `bearer ${this.localStorage.get(myGlobals.STORAGE_KEYS.TOKEN_KEY)}`,
      })
    };
    return this.http.post(path, uploadData, config)
      .pipe(catchError(this.formatErrors));
  }

  uploadFile(path: string, files, type) {
    const uploadData = new FormData();
    uploadData.append("file", files, files.name);
    uploadData.append("filetype", type);
    const config = {
      headers: new HttpHeaders({
        Authorization: `bearer ${this.localStorage.get(
          myGlobals.STORAGE_KEYS.TOKEN_KEY
        )}`,
         
      }),
    };
    // console.log("CALLING TWICE")
    return this.http.post(path, uploadData).pipe(catchError(this.formatErrors));
  }
  // uploadFile(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   const headers = new HttpHeaders({
  //     'Authorization': 'bearer your-token',
  //     'Accept': 'application/json, text/plain, */*'
  //     // Content-Type is not explicitly set because the browser will set it along with the correct boundary
  //   });

}
