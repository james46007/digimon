import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {FireService} from "../services/firebase/fire.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authenticationService: FireService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const user = JSON.parse(currentUserString);
      if (user.emailVerified) {
        return true;
      }
    }
    this._router.navigateByUrl('/login');
    return false;
  }

}
