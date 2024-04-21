import { get } from 'lodash';

export default class LocationListing {
    locationName: string;
    locationCode: string;
    address: string;
    society: string;
    country: string;
    state: string;
    city: string;
    pincode : string;
    phoneNumber: string;
    email: string;
    warehouseType: string;
    warehouseEnabled: string;
    availableInCheckout: string;
    timings: any;
    
    constructor(location){
        this.locationName = get(location, 'locationName');
        this.locationCode = get(location, 'locationCode');
        this.address = get(location, 'locationAddress.houseNo');
        this.society = get(location,'locationAddress.society')
        this.country = get(location, 'locationAddress.country.countryName');
        this.state = get(location, 'locationAddress.state.stateName');
        this.city = get(location, 'locationAddress.city.cityName');
        this.pincode = get(location, 'locationAddress.pincode');
        this.phoneNumber = get(location, 'locationAddress.phoneNumber');
        this.email = get(location,'locationAddress.email');
        this.warehouseType = get(location, 'warehouseType');
        this.warehouseEnabled = get(location, 'isWarehouseEnabled');
        this.availableInCheckout = get(location, 'availableInCheckout');
        this.timings = this.timingsList(location.hours.days);
    }

    timingsList(list){
        const timingList = [];
        for(let timings of list){
            for(let time in timings){
                timingList.push({ day: time, hoursFrom: timings[time].hoursFrom, hoursTo: timings[time].hoursTo })
            }
        }
        return timingList;
    }
}