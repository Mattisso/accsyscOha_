import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INstbalanceinput } from '../nstbalanceinput';
import { NstbalanceinputService } from '../nstbalanceinput.service';

@Component({
  selector: 'app-nstbalanceinput-list',
  templateUrl: './nstbalanceinput-list.component.html',
  styleUrls: ['./nstbalanceinput-list.component.css']
})
export class NstbalanceinputListComponent implements OnInit {

  pageTitle = 'Balance Sheet List';
  errorMessage: string;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredBalances = this.listFilter ? this.performFilter(this.listFilter) : this.balances;
  }

  filteredBalances: INstbalanceinput[] = [];

  balances: INstbalanceinput[] = [];
      constructor(private balanceinputservice: NstbalanceinputService,
      private route: ActivatedRoute) {  }


      performFilter(filterBy: string): INstbalanceinput[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.balances.filter((balance: INstbalanceinput) =>
          balance.IntitulCompte.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }


      ngOnInit() {
        this.getBalances();

      }

  getBalances(): void {
        this.balanceinputservice.getBalances()
        .subscribe((data: INstbalanceinput[]) => {
          this.balances = data;
      this.filteredBalances = this.balances;
          console.log(this.filteredBalances);
        },
          error => this.errorMessage = <any>error);
      }
}
