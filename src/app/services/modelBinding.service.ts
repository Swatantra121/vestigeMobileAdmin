import { Injectable } from '@angular/core';
import { get } from 'lodash';
import { ProductListModel } from 'src/app/models/Product';
import { CustomerListModel } from 'src/app/models/Customer';
import { CategoryListModel } from 'src/app/models/Category';
import { LocationListModel } from 'src/app/models/Location';
import { CountryListModel } from 'src/app/models/Country';
import { StateListModel } from 'src/app/models/State';
import { CityListModel } from 'src/app/models/City';

@Injectable({
    providedIn: 'root'
})

export class ModelBindingService {
    url: string = 'http://115.249.4.195:8080';
    constructor() {

    }


    mappingDataReturn(functionName, apiresponseData): any {
        if(apiresponseData){
            apiresponseData = apiresponseData.map(
                res => this[functionName](res)
            );
            return apiresponseData;
        }else{
            return [];
        }
    }

    productListDecoder(request): ProductListModel {
        return {
            id: request.uniqueId,
            productName: get(request, 'generalInformation.productName', null),
            shortDescription: get(request, 'generalInformation.shortDescription', null),
            pv: get(request, 'generalInformation.pv', null),
            bv: get(request, 'generalInformation.bv', null),
            position: get(request,'position',null),
            categories: get(request,'categories'),
            isPublish: get(request, 'isPublish', null),
            inventoryType: get(request, 'generalInformation.inventoryType', null),
            isStockAvailability: get(request, 'inventory.isStockAvailibility', null),
            checked: false,
            productType: get(request, 'productType', null),
            skuCode: get(request, 'generalInformation.skuCode', null),
            offerPrice: get(request, 'priceInformation.offerPrice', null),
            visibility: get(request, 'generalInformation.isVisibility', null),
            status: get(request, 'generalInformation.status', null),
        }
    }

    productListEncoder(request) {
        return {
            // uniqueId: request.id,
            // productName: request.productName,
            // shortDescription: request.shortDescription,
            skuCode: request.skuCode,
            // imageUrl: request.,
            // pv: request.pv,
            // bv: request.bv,
            // price: request.price,
            // status: request.status,
            // type: request.type,
            position: Number(request.position),
            // isVisibility: request.visibility
        }
    }

    productImageEncoder(request, skuCode) {
        return {
            generalInformation: {
                skuCode: skuCode
            },
            images: request
        }
    }

    /**
     * @description listing of customer
     * @param request response of the api from the server
     * @returns customerList
     */
    customerListDecoder(request): CustomerListModel {
        return {
            firstName: get(request, 'firstName', ''),
            lastName: get(request, 'lastName', ''),
            email: get(request, 'emailId', ''),
            phoneNumber: get(request, 'mobileNumber', ''),
            distributorId: get(request, 'distributorId', ''),
            customerSince: get(request, 'registrationDate', ''),
            updatedAt: get(request, 'modifiedOn', ''),
            active: get(request, 'status', ''),
            address: this.addressListDecoder(get(request, 'distributorsAddress')),
        }
    }

    /**
     * @description listing of the address for customer
     * @param addressList list of address in the customerListing response
     * @returns customer residentialAddress 
     */
    addressListDecoder(addressList) {
        let customerAddress = {};
        for (let address of addressList) {
            if (address.addressType === 'Residential') {
                customerAddress = {
                    pincode: get(address, 'pincode.pincode', 'No pincode found'),
                    state: get(address, 'stateName', 'No state found'),
                    country: get(address, 'countryName', 'No country found')
                }
            }
        }
        return customerAddress;
    }

    /**
     * @description listing of category
     * @param request response of the api from the server
     * @returns categoryList
     */
    categoryListDecoder(request): CategoryListModel {
        return {
            name: get(request, 'name'),
            description: get(request, 'description'),
            activeFor: get(request, 'activeFor'),
            activeFrom: get(request, 'activeFrom'),
            activeTo: get(request, 'activeTo'),
            isDynamicKittingCategory: get(request, 'isDynamicKittingCategory'),
            isPublished: request.isPublished ? get(request,'isPublished') : false,
            image: request.image ? this.url + request.image : '',
            isIncludeInNavigation: get(request, 'isIncludeInNavigation'),
            isActive: get(request, 'isActive'),
            urlKey: get(request, 'urlKey'),
            childId: get(request, 'childId'),
            checked: false,
            expand: false,
            // linkedProducts: get(request, 'linkedProducts'),
            linkedProducts: request.linkedProducts ? this.mappingDataReturn('productListDecoder', get(request, 'linkedProducts')) : [],
            // cmsId: get(request,'cmsId'),
            metaInfo: get(request, 'metaInfo'),
            levelId: get(request, 'levelId'),
            parentId: get(request, 'parentId'),
            subCategotList: request.subCategotList ? this.mappingDataReturn('categoryListDecoder', get(request, 'subCategotList')) : []
        }
    }

    productCatagoryEncoder(request) {
        return request.childId;
    }

    linkCategoryToProductEncoder(request) {
        return {
            generalInformation: {
                skuCode: request.skuCode
            },
            position: Number(request.position),
        }
    }

    /**
     * @description listing of category
     * @param request response of the api from the server
     * @returns categoryList
     */
    locationListDecoder(request): LocationListModel {
        return {
            locationName: get(request, 'locationInfo.locationName', null),
            locationCode: get(request, 'locationInfo.locationCode', null, null),
            houseNo: get(request, 'addressInfo.houseNo', null),
            society: get(request, 'addressInfo.society', null),
            country: get(request, 'addressInfo.country.countryName', null),
            isPublish: get(request, 'isPublish', null),
            state: get(request, 'addressInfo.state.stateName', null),
            city: get(request, 'addressInfo.city.cityName', null),
            pincode: get(request, 'addressInfo.pincode', null),
            phoneNumber: get(request, 'addressInfo.phoneNumber', null),
            email: get(request, 'addressInfo.email', null),
            fulfillmentType: get(request, 'locationInfo.fulfillmentType', null),
            warehouseEnabled: get(request, 'locationInfo.isWarehouseEnabled', null),
            availableInCheckout: get(request, 'locationInfo.availableInCheckout', null),
            timings: this.timingsListDecoder(get(request, 'addressInfo.days', [])),
        }
    }

    addressFormat(houseNo, city, state, country) {

    }

    /**
     * @description shows timings of lunch timing from & to
     * @param list timing list coming from server
     * @returns list of object { with day, hoursFrom & hoursTo }
     */
    timingsListDecoder(list) {
        const timingList = [];
        for (const timings of list) {
            for (let time in timings) {
                timingList.push({ day: time, hoursFrom: timings[time].hoursFrom, hoursTo: timings[time].hoursTo })
            }
        }
        return timingList;
    }

    countryListDecoder(request): CountryListModel {
        return {
            countryId: get(request, 'countryId'),
            countryName: get(request, 'countryName'),
            countryCode: get(request, 'countryCode'),
            status: get(request, 'status')
        }
    }

    stateListDecoder(request): StateListModel {
        return {
            stateId: get(request, 'stateId'),
            stateCode: get(request, 'stateCode'),
            stateName: get(request, 'stateName'),
            countryId: get(request, 'countryId')
        }
    }

    cityListDecoder(request): CityListModel {
        return {
            cityId: get(request, 'cityId'),
            cityCode: get(request, 'cityCode'),
            cityName: get(request, 'cityName'),
            stateId: get(request, 'stateId')
        }
    }

}