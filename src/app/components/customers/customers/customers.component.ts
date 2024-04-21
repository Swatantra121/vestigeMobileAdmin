import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { isCustomerActive, formatDate, formatTimeWithAMPM } from 'src/app/utility/Utility';
import { _ } from 'lodash';
import { LoaderService } from 'src/app/services/loader.service';
import { Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  // Forms
  filterForm: FormGroup;
  searchForm: FormGroup;

  isSubmit: boolean = true;
  checked: boolean = false;
  selectedArray: Array<any> = [];
  advanceFilterContainer: boolean = false;
  isDesc: boolean = false;
  column: string = '';
  direction: number;
  searchBy: string = '';
  checkedAll: false;
  customerList: Array<any> = [];
  actionList = [{ key: 'Delete', value: 'delete' }, { key: 'Change Status', value: 'ChangeStatus' }];
  searchByList: [
    { key: 'Name', value: 'productName' },
    { key: 'Id', value: 'id' },
    { key: 'SkuCode', value: 'skuCode' },
    { key: 'None', value: null }]
  isAllSelected = false;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private router: Router) { }

  ngOnInit() {
    this.getCustomerList();
    this.buildFilterForm();
    this.buildSearchForm();
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: [''],
      searchBy: [null],
    });
  }

  buildFilterForm() {
    this.filterForm = this.formBuilder.group({
      offerPriceFrom: [null],
      offerPriceTo: [null],
      currency: [null],
      idFrom: [null],
      idTo: [null],
      productType: [null],
      inventoryType: [null],
      isVisibility: [null],
      WnsFrom: [null],
      WnsTo: [null],
    });
  }

  searchCustomer(product) {
    if (this.searchForm.value.search.length >= 3 && this.searchForm.value.searchBy) {
      this.getCustomerList();
      return;
    }
    if (this.searchForm.value.search.length > 0 && this.searchForm.value.searchBy === 'id') {
      this.getCustomerList();
      return;
    }
    this.getCustomerList();
  }

  actionFunction(action) {
    const CustomerId = this.selectedArray.map(function (el) { return el.CustomerId; });
    switch (action) {
      case 'delete':
        this.deleteCustomer(CustomerId);
        break;
      case 'ChangeStatus':
        // this.changeCustomerStatus(skuCodeArray);
        break;
      default:
    }
    this.selectedArray = [];
  }

  /**
   * @function getAllCustomerList get all the list of customers from server
   * @description getting list of customers
   */
  getCustomerList() {
    this.loaderService.isLoading(true);
    this.customerService.getAllCustomers().subscribe(response => {
      this.loaderService.isLoading(false);
      this.customerList = response;
      this.customerList.map(customer => {
        customer.customerSinceDate = formatDate(customer.customerSince);
        customer.customerSinceTime = formatTimeWithAMPM(new Date(customer.customerSince));
        customer.updatedAtDate = formatDate(customer.updatedAt);
        customer.updatedAtTime = formatTimeWithAMPM(new Date(customer.updatedAt));
        customer.active = isCustomerActive(customer.active);
        customer.checked = false;
      });
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  /**
   * @function selectedAll check all checkboxes in once
   * @description selectedAll select all customers in once for performing some actions
   */
  selectedAll() {
    this.customerList.forEach(element => {
      element.checked = this.isAllSelected;
    });
  }

  /**
   * @function isChecked select one customer once for performing some action
   * @description select particular customer for performing some action
   * @param checked value of checkboxes
   * @param id unique value for identifying the customer
   */
  isChecked(checked, product) {
    if (checked.checked === true) {
      this.selectedArray.push(product);
    } else {
      this.selectedArray = this.selectedArray.filter((element) => {
        return element.skuCode !== product.skuCode;
      });
    }
  }

  /**
   * @function showAdvanceFilter showing advance filter for performing some advance funcitonality
   * @description showing the advanceFilter menu
   * @param advanceFilter { true, false }
   */
  showAdvanceFilter(advanceFilter) {
    if (!advanceFilter) {
      this.filterForm.reset();
    }
    this.advanceFilterContainer = advanceFilter;
  }

  /**
   * @function sort sorting the column data
   * @description sort the data of the customers in a column
   * @param property column name
   */
  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  search(product) {
    console.log('Product', product);
  }

  editCustomers() {
    alert('edit customers');
  }

  deleteCustomer(CustomerId) {
    alert('delete customer');
  }

  addCustomer() {
    this.router.navigate(['customer/account-info']);
  }

  importData() {
    alert('import data');
  }
}
