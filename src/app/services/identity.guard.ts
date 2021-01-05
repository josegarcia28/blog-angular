import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({providedIn: 'root'})
export class IdentityGuard implements CanActivate {
    constructor(private _router: Router,
                private _userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let identity = this._userService.getIdentity();
        if(identity){
            return true;
            
        } else {
            this._router.navigate(['/error']);
            return false;
        }
    }
  
}