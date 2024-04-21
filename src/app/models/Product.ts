export interface ProductListModel {
    id : number;
    productName : string;
    shortDescription : string;
    pv : number;
    bv : number;
    isPublish: boolean;
    inventoryType: string;
    isStockAvailability: string;
    position : string; 
    checked: boolean; 
    productType : string; 
    skuCode : string;
    offerPrice : number; 
    visibility : string;
    status : boolean;
    categories: Array<any>;
}
