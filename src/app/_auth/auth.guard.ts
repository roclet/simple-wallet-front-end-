import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../shared/services/user/user-auth.service';
import { UserService } from '../shared/services/user/user.service';
import { encodeParam, extraOrgCode } from '../shared/util/common.util';



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  orgCode: string ='';
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.orgCode = extraOrgCode();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.userAuthService.getToken() !== null) {
      const role = route.data['roles'] as Array<string>;
      if (role) {
        const match = this.userService.roleMatch(role);
        if (match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }
    if(this.orgCode === ''){
      const encoded: string = encodeParam(this.orgCode);
      this.userAuthService.logout(encoded);
    }else {
      const encoded: string = encodeParam(this.orgCode);
      this.userAuthService.logout(encoded);
    }
    
    return false;
  }
}
