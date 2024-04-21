import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css']
})
export class InvoiceListingComponent implements OnInit {

  advanceFilterContainer = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  viewInvoice() {
    this.router.navigate(['invoices/view-invoice']);
  }

  showAdvanceFilter(flag) {

  }
}
