import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';
import { RoutingSettingsService } from '../../services/routing-settings.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private routingSettingsService: RoutingSettingsService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    var isAuthorized = false;
    if (currentUser) {
      var isRouteAllow = this.routingSettingsService.IsRoutingAllow(currentUser.user.mtype, route.routeConfig.path);
      if (isRouteAllow) {
        return true;
      }
      else {
        this.authenticationService.logout();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }    
    }
    else {
      this.authenticationService.logout();
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    //// not logged in so redirect to login page with the return url
    //this.authenticationService.logout();
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    //return false;
  }
}
