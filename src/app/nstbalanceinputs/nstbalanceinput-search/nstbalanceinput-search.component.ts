import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import {INstbalanceinput} from '../nstbalanceinput';
import {NstbalanceinputService} from '../nstbalanceinput.service';

@Component({
  selector: 'app-nstbalanceinput-search',
  templateUrl: './nstbalanceinput-search.component.html',
  styleUrls: ['./nstbalanceinput-search.component.css']
})
export class NstbalanceinputSearchComponent implements OnInit {
  balances$: Observable<INstbalanceinput[]>;
  private searchTerms = new Subject<string>();

  constructor(private nstbalanceinputService: NstbalanceinputService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    this.balances$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.nstbalanceinputService.searchBalanceinputs(term)),
    );
  }

}
