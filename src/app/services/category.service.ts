import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import * as Urls from 'src/app/utility/Urls';
import { ModelBindingService } from './modelBinding.service';
import { CategoryListModel } from 'src/app/models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  parentId: any;

  constructor(private apiService: ApiService,
    private modelBindingService: ModelBindingService) { }

  buildUrl(url, searchValue?): string {
    let param = '';
    if (searchValue) {
      if (searchValue.searchBy && searchValue.search !== '') {
        for (let key of Object.keys(searchValue)) {
          if (searchValue[key]) {
            param = param + `${key}=${searchValue[key]},`;
          }
        }
      }
    }
    param = (param !== '') ? (`${url}?q=${param}`).slice(0, -1) : url;
    return param;
  }

  /**
   * @description get the category listing from the server
   * @returns observable response from server 
   */
  getCategoryList(parentId, searchValue?) {
    const url = this.buildUrl(`${Urls.ServiceEnum.Category}/${parentId}`, searchValue);
    return this.apiService.get(url).pipe(map(Response => {
      return this.modelBindingService.mappingDataReturn('categoryListDecoder', Response);
    }));
  }

  /**
   * @description create category in the db
   * @returns observable response from server 
   */
  createCategoryInfo(request, isUpdate?: boolean) {
    let url;
    if (isUpdate) {
      url = `${Urls.ServiceEnum.Category}/${request.childId}`
      return this.apiService.put(url, request);
    } else {
      url = Urls.ServiceEnum.Category;
      request.childId && (url = `${Urls.ServiceEnum.Category}?childId=${request.childId}`)
      return this.apiService.post(url, request);
    }
  }

  createCategoryMetaInfo(request, id) {
    const url = `${Urls.ServiceEnum.Category}/${id}/${Urls.DistributorServiceEnum.MetaInformation}`
    return this.apiService.put(url, request)
  }

  linkCategoryToProduct(request,childId) {
    request = this.modelBindingService.mappingDataReturn('linkCategoryToProductEncoder', request)
    const url = `${Urls.ServiceEnum.Category}/${Urls.DistributorServiceEnum.CategoryProducts}${childId}`;
    return this.apiService.put(url, request);
  }

  searchSubCategories(id) {
    const url = `${Urls.ServiceEnum.Category}/${Urls.DistributorServiceEnum.SubCategories}${id}`;
    return this.apiService.get(url)
      .pipe(map(Response => {
        return this.modelBindingService.categoryListDecoder(Response);
      }));
  }

  activeForList(){
    let url = `${Urls.ServiceEnum.Category}/${Urls.DistributorServiceEnum.ActiveFor}`;
    return this.apiService.get(url);
  }

  searchCategories(searchBy,params) {
    let url=`${Urls.ServiceEnum.Category}/${Urls.DistributorServiceEnum.SearchCategory}`;
    searchBy === 'id' ? url = `${url}childId=${params}` : url = `${url}name=${params}`;
    return this.apiService.get(url)
      .pipe(map(Response => {
        return this.modelBindingService.mappingDataReturn('categoryListDecoder', Response);
      }));
  }

  publishCategory(childId){
    const url = `${Urls.ServiceEnum.Category}/${Urls.DistributorServiceEnum.PublishCategory}true&&childId=${childId}`;
    return this.apiService.put(url);
  }

  /**
   * @description uploading image and saving in the db
   * @param image {uploaded file} type images
   * @returns observable response from server  
   */
  uploadFile(image) {
    const url = `${Urls.ServiceEnum.Category}/${Urls.DistributorServiceEnum.UploadImages}`
    return this.apiService.uploadMulitpleFile(url, image);
  }
}
