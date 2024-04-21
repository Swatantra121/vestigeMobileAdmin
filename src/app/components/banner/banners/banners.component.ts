import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addBanner() {
    this.router.navigate(['banners/banner-info']);
  }
}
