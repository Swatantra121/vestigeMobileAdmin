import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  advanceFilterContainer: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  submit() {

  }

  showAdvanceFilter(boolean) {

  }
}
