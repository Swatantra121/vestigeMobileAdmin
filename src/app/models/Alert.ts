import { ALERT_TYPE } from 'src/app/utility/Constant';

export interface Alert {
    type: ALERT_TYPE;
    message: string;
}
