import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { RoutesRecognized } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RouterService {
  title = 'app';
  subscribedRouter;
  activeRouteUrl = new BehaviorSubject<any>({url: this.routerService.url, title: this.title});


  constructor(private routerService: Router,
    private titleService: Title) { }


  ActivateRouteService() {
    this.subscribedRouter = this.routerService.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        this.title = event.state.root.children[0].data.title ||
          event.state.root.children[0].children[0].data.title;
        this.titleService.setTitle('Vestige | ' + this.title);
      }
      if (event instanceof NavigationEnd) {
        this.activeRouteUrl.next({url: this.routerService.url, title: this.title });
      }
    });
  }


  DeactivateRouteService() {
    this.subscribedRouter.unsubscribe()
  }
}
