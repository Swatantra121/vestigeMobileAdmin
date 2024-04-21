import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import * as Urls from 'src/app/utility/Urls';
import { ModelBindingService } from 'src/app/services/modelBinding.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  createProductJson = <any>{};
  productCategories: Array<any> = [];

  constructor(private apiService: ApiService,
    private modelBindingService: ModelBindingService,
  ) { }

  buildUrl(url, searchValue, filterValue): string {
    let param = '';

    if (searchValue) {
      if (searchValue.searchBy && searchValue.search !== '') {
        param = param + `${searchValue.searchBy}=${searchValue.search},`;
      }
    }

    if (filterValue) {
      for (let key of Object.keys(filterValue)) {
        if (filterValue[key]!= null) {
          param = param + `${key}=${filterValue[key]},`;
        }
      }
    }

    param = (param !== '') ? (`${url}?q=${param}`).slice(0, -1) : url;
    return param;
  }

  getProductList(searchValue?, filterValue?) {
    const url = this.buildUrl(Urls.ServiceEnum.Products, searchValue, filterValue);
    return this.apiService.get(url)
    .pipe(map(Response => {
      return this.modelBindingService.mappingDataReturn('productListDecoder', Response)
    }));
  }

  publishProduct(skuCode) {
    const url = `${Urls.ServiceEnum.Products}/publish?isPublish=true&&skuCode=${skuCode}`;
    return this.apiService.put(url);
  }

  deleteProduct(skuCodeArray) {
    let param = ''
    for(let skuCode of skuCodeArray){
      param = param + skuCode + ',' 
    }
    param = param.slice(0, -1)

    const url = `${Urls.ServiceEnum.Products}?skuCodes=${param}`;
    return this.apiService.delete(url,skuCodeArray);
  }

  changeProductStatus(skuCodeArray) {
    const url = `${Urls.ServiceEnum.Products}/change-status`;
    return this.apiService.put(url,skuCodeArray);
  }

  getProductBySkucode(skuCode) {
    const url = `${Urls.ServiceEnum.Products}/${skuCode}`;
    return this.apiService.get(url);
  }

  productRequest(createProductJson, isUpdate?: boolean) {
    const url = `${Urls.ServiceEnum.Products}/${Urls.DistributorServiceEnum.GeneralInfo}`;
    if (isUpdate) {
      return this.apiService.put(url, createProductJson);
    }
    else {
      return this.apiService.post(url, createProductJson);
    }
  }

  productSetting() {
    const url = `${Urls.ServiceEnum.Products}/${Urls.DistributorServiceEnum.ProductSetting}`;
    return this.apiService.get(url);
  }

  addProductCategories(skuCode) {
    const request = this.modelBindingService.mappingDataReturn('productCatagoryEncoder', this.productCategories);
    const url = `${Urls.ServiceEnum.Products}/${Urls.DistributorServiceEnum.Category}${skuCode}`;
    return this.apiService.put(url, request);
  }

  setProductType(ProductType) {
    const url = `${Urls.ServiceEnum.Products}/${Urls.DistributorServiceEnum.ProductType}`;
    return this.apiService.put(url + '?skuCode=S001' + '&productType=' + ProductType, ProductType);
  }
  
  uploadProductImages(imageList, skuCode) {
    const url = `${Urls.ServiceEnum.Products}/${Urls.DistributorServiceEnum.UploadImages}${skuCode}`;
    return this.apiService.uploadMulitpleFile(url, imageList);
  }

  uploadProductDetails(image,skuCode) {
    const url = `${Urls.ServiceEnum.Products}/${Urls.DistributorServiceEnum.ImageDetails}${skuCode}`;
    return this.apiService.put(url, image);
  }

  deleteProductImages(skuCode,imageName){
    const url=`${Urls.ServiceEnum.Products}/${Urls.DistributorServiceEnum.ImageDetails}${skuCode}&&images=${imageName}`;
    return this.apiService.delete(url);
  }

  addProductPrice(createProductJson, skuCode) {
    const url = `${Urls.ServiceEnum.Products}/${Urls.DistributorServiceEnum.PriceInfo}?skuCode=${skuCode}`;
    return this.apiService.put(url, createProductJson);
  }

  addMetaInformation(createProductJson, skuCode) {
    const url = `${Urls.ServiceEnum.Products}/${Urls.DistributorServiceEnum.MetaInformation}?skuCode=${skuCode}`;
    return this.apiService.put(url, createProductJson);
  }

  addInventory(createProductJson, skuCode) {
    const url = `${Urls.ServiceEnum.Products}/${Urls.DistributorServiceEnum.ProductInventory}?skuCode=${skuCode}`;
    return this.apiService.put(url, createProductJson);
  }

  addRelatedProduct(request, skuCode) {
    request = this.modelBindingService.mappingDataReturn('productListEncoder', request)
    const url = `${Urls.ServiceEnum.Products}/related-products?skuCode=${skuCode}`;
    return this.apiService.put(url, request);
  }
  addUpSellProduct(request, skuCode) {
    request = this.modelBindingService.mappingDataReturn('productListEncoder', request)
    const url = `${Urls.ServiceEnum.Products}/up-sells?skuCode=${skuCode}`;
    return this.apiService.put(url, request);
  }
  addCrossSellProduct(request, skuCode) {
    request = this.modelBindingService.mappingDataReturn('productListEncoder', request)
    const url = `${Urls.ServiceEnum.Products}/cross-sells?skuCode=${skuCode}`;
    return this.apiService.put(url, request);
  }
  getBrandList() {
    const url = Urls.ServiceEnum.Brands;
    return this.apiService.get(url);
  }
}
