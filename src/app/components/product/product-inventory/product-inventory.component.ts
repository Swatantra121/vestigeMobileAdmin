import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { LocationService } from 'src/app/services/location.service';
import { INVENTORY_KEYS, STATUS_LIST, VISIBILITY_LIST } from 'src/app/utility/Constant';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LocalStorageService } from '../../../services/local-Storage';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css']
})
export class ProductInventoryComponent implements OnInit {

  skuCode: string;

  productInventoryForm: FormGroup;
  productWarehouseField: FormArray;
  quantityUsesDecimal: Array<any> = INVENTORY_KEYS;
  multipleShipping: Array<any> = INVENTORY_KEYS;
  enableIncrementQty: Array<any> = INVENTORY_KEYS;
  backOrders: Array<any> = STATUS_LIST;
  stockAvailability: Array<any> = STATUS_LIST;
  manageStock: Array<any> = STATUS_LIST;
  multiStock: Array<any> = STATUS_LIST;
  stockManagement: Array<any> = VISIBILITY_LIST;
  showLoader: boolean = false;
  locationList: Array<any> = [];
  backorderList: Array<any> = [];
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private alertService: AlertService,
    private loaderService: LoaderService) {
    this.skuCode = this.route.snapshot.paramMap.get('skuCode');
    this.localStorage.set('skuCode', this.skuCode);
  }

  ngOnInit() {
    this.buildForm();
    this.getlocations();
    this.getBackorderListing();
    this.getFormValue();
  }

  buildForm() {
    this.productInventoryForm = this.formBuilder.group({
      isManageStock: [''],
      quantity: ['', Validators.required],
      quantityForOutOfStock: [''],
      minQuantityAllowedInCart: [''],
      maxQuantityAllowedInCart: [''],
      isQuantityUsesDecimal: [''],
      isDividedIntoMultibox: [''],
      backOrders: [''],
      belowQuantityNotify: [''],
      isEnableQuantityIncrement: [''],
      quantityIncrement: [''],
      isStockAvailibility: [''],
      multiStock: [''],
      productWarehouseForm: this.formBuilder.array([]),
    });
    this.productWarehouseField = <FormArray>this.productInventoryForm.controls.productWarehouseForm;
  }

  getlocations() {
    this.loaderService.isLoading(true);
    this.locationService.getAllLocations().subscribe(response => {
      this.locationList = response
      this.createWarehouseForm();
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  getBackorderListing() {
    this.locationService.getBackorderSelection().subscribe(response => {
      this.backorderList = response
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  getFormValue() {
    this.loaderService.isLoading(true);
    this.productService.getProductBySkucode(this.skuCode).subscribe((data) => {
      if (data.inventory) {
        this.productInventoryForm.patchValue(data.inventory);
      }
      this.loaderService.isLoading(false);
    }, error => {
      this.loaderService.isLoading(false);
    });
  }

  warehouseField() {
    return this.formBuilder.group({
      stockManagement: new FormControl(''),
      noBackborders: new FormControl(''),
      stockValue: new FormControl(''),
      expiryDate: new FormControl(''),
      MRP: new FormControl(''),
      offerPrice: new FormControl('')
    });
  }

  createWarehouseForm() {
    for (let i = 0; i < this.locationList.length; i++) {
      const fieldName = this.locationList[i].locationName
      const field = this.formBuilder.group({
        [fieldName]: this.warehouseField()
      });
      this.productWarehouseField.push(field);
    }
    this.productWarehouseField.disable();
  }


  addStockField(value) {
    if (value) {
      this.productWarehouseField.enable()
    } else {
      this.productWarehouseField.disable()
    }
  }

  saveProductInventoryInformation() {
    if (!this.productInventoryForm.valid) {
      this.alertService.error(null,'Please fill valid details.')      
      return;
    }

    this.loaderService.isLoading(true);
    this.productService.addInventory(this.productInventoryForm.value, this.skuCode)
      .subscribe((data) => {
          this.alertService.success(null, 'Inventory has been saved successfully.')
          this.loaderService.isLoading(false);
        this.router.navigate([`/product/${this.skuCode}/categories`]);
      },
        error => {
          this.alertService.error(null)
          this.loaderService.isLoading(false);
          this.alertService.error(error.title);
        });
  }
}

