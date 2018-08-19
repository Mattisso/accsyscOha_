import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { NstbalanceinputEditComponent } from './nstbalanceinput-edit/nstbalanceinput-edit.component';
@Injectable({
  providedIn: 'root'
})
export class NstbalanceinputGuardService implements CanActivate {



  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
      alert('Invalid balance sheet Id');
      // start a new navigation to redirect to list page
      this.router.navigate(['/nstbalanceinputs']);

      return false;
    }


    return true;
  }

}

@Injectable()
export class NstbalanceinputEditGuard implements CanDeactivate<NstbalanceinputEditComponent> {

  canDeactivate(component: NstbalanceinputEditComponent): boolean {
    if (component.nstbalanceinputForm.dirty) {
      const intitulCompte = component.nstbalanceinputForm.get('IntitulCompte').value || 'New Balance';
      return confirm(`Navigate away and lose all changes to ${intitulCompte}?`);
    }
    return true;
  }





}
