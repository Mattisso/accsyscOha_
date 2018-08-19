import { Injectable } from '@angular/core';
import {  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      // tslint:disable-next-line:prefer-const
     /* let  url: string = state.url;

      return this.checkLogin(url);*/

      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['users/login'], { queryParams: { returnUrl: state.url }});
    return false;

  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    // tslint:disable-next-line:prefer-const
    let url = `/${route.path}`;
    return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
      if (this.authService.isLoggedIn) {
          return true;
      }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    // tslint:disable-next-line:prefer-const
    let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    // tslint:disable-next-line:prefer-const
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/users/login'], navigationExtras);
    return false;
    }
}
