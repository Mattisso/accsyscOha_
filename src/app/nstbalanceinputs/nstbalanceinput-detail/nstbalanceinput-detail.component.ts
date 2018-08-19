import { Component, OnInit, HostBinding } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import { INstbalanceinput } from '../nstbalanceinput';
import { NstbalanceinputService } from '../nstbalanceinput.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {slideInDownAnimation} from '../../animations';

@Component({
  selector: 'app-nstbalanceinput-detail',
  templateUrl: './nstbalanceinput-detail.component.html',
  styleUrls: ['./nstbalanceinput-detail.component.css'],
  animations: [slideInDownAnimation]
})
export class NstbalanceinputDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
@HostBinding('style.display')   display = 'block';
@HostBinding('style.position')  position = 'absolute';

  pageTitle = 'Balance Sheet Detail';
  balance: INstbalanceinput | undefined;
  balance$: Observable<INstbalanceinput>;
  errorMessage: string;

    constructor(private balanceInputService: NstbalanceinputService,
      private router: Router,
      private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.balance$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
      this.balanceInputService.getBalance(params.get('id')))
      );

/*   let id = this.route.snapshot.paramMap.get['id'];
 this.balance$= this.getBalance(id); */

    }
    getBalance(id: string) {
      this.balanceInputService.getBalance(id).subscribe(
        balance => this.balance = balance,
        error => this.errorMessage = <any>error);
    }

    getBalances(balance: INstbalanceinput) {
      const balanceId = balance ? balance.id : null;

      this.router.navigate(['/nstbalanceinputs', {id: balanceId}]);
    }

}
