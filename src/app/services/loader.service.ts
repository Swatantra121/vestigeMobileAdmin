import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private subject = new Subject();

  constructor(private router: Router,) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          this.clear();
        }
    });
  }

  showLoader(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * @function isLoading()
   * @description Showing loading
   */
  isLoading(loader) {
    this.loader(loader);
  }

  /**
   * @function alert()
   * @description showing the message in the alert box
   * @param type enum alertType => SUCCESS, WARN, ERROR
   * @param message: String String messages which are going to be display on the screen
   */
  private loader(loader: boolean) {
    this.subject.next({loader: loader });
  }

  /**
   * @function clear()
   * @description method is used for clear alert box
   */
  clear() {
    this.subject.next();
  }
}
