import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-about-vbd-list',
  templateUrl: './about-vbd-list.component.html',
  styleUrls: ['./about-vbd-list.component.css']
})
export class AboutVBDListComponent implements OnInit {

  advanceFilterContainer = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addPage() {
    this.router.navigate(['about-vbd/page-info']);
  }

  searchProduct() {

  }

  showAdvanceFilter(flag) {

  }

}
