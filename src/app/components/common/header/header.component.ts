import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-Storage';
import * as myGlobals from 'src/app/globals';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userData;
  constructor(private authService: AuthService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.userData = this.localStorage.get(myGlobals.STORAGE_KEYS.DISTRIBUTOR_ID_KEY);
  }


  logout() {
    this.authService.logout();
  }
}
