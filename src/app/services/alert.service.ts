import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { ALERT_TYPE } from 'src/app/utility/Constant';
import { ALERT_MESSAGE } from 'src/app/utility/alert-message';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();

  constructor(private router: Router) {
  }

  getAlertMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * @function success
   * @description Showing success message.
   * @param message: String messages which are going to be display on the screen.
   * @param messageCode: Pre-Define Message Code which are going to be display on the screen.
   */
  success(messageCode, message?) {
    this.alert(ALERT_TYPE.SUCCESS, messageCode, message);
  }

  /**
   * @function error()
   * @description Showing error message
   * @param message: String messages which are going to be display on the screen
   * @param messageCode: Pre-Define Message Code which are going to be display on the screen.
   */
  // error(message){
  //   this.alert(ALERT_TYPE.ERROR, message);
  // }

  error(messageCode, message?) {
    this.alert(ALERT_TYPE.ERROR, messageCode, message);
  }

  /**
   * @function warn()
   * @description Showing warning message
   * @param message: String messages which are going to be display on the screen
   * @param messageCode: Pre-Define Message Code which are going to be display on the screen.
   */
  warn(messageCode, message?) {
    this.alert(ALERT_TYPE.WARNING, messageCode, message);
  }


  /**
   * @function alert()
   * @description showing the message in the alert box
   * @param type enum alertType => SUCCESS, WARN, ERROR
   * @param message: String String messages which are going to be display on the screen
   */
  private alert(type, messageCode, message) {

    if (messageCode) {
      switch (type) {
        case ALERT_TYPE.SUCCESS:
          message = ALERT_MESSAGE.success[messageCode] ? ALERT_MESSAGE.success[messageCode] : ALERT_MESSAGE.default;
          break;
        case ALERT_TYPE.ERROR:
          message = ALERT_MESSAGE.error[messageCode] ? ALERT_MESSAGE.error[messageCode] : ALERT_MESSAGE.default;
          break;
        case ALERT_TYPE.WARNING:
          message = ALERT_MESSAGE.warning[messageCode] ? ALERT_MESSAGE.warning[messageCode] : ALERT_MESSAGE.default;
          break;
        default:
      }
    }

    this.subject.next({ type: type, message: message });
  }

  /**
   * @function clear()
   * @desc method is used for clear alert box
   */
  clear() {
    this.subject.next();
  }
}
