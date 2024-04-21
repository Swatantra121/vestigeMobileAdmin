//Location Model

export interface LocationListModel {
    locationName: string;
    locationCode: string;
    houseNo: string;
    society: string;
    country: string;
    isPublish:boolean;
    state: string;
    city: string;
    pincode : string;
    phoneNumber: string;
    email: string;
    fulfillmentType: string;
    warehouseEnabled: string;
    availableInCheckout: string;
    timings?: any;
}