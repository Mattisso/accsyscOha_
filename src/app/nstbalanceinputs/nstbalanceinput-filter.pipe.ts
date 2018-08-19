import { Pipe, PipeTransform } from '@angular/core';
import { INstbalanceinput } from './nstbalanceinput';

@Pipe({
  name: 'nstbalanceinputFilter'
})
export class NstbalanceinputFilterPipe implements PipeTransform {

  transform(value: INstbalanceinput[], filterBy: string): INstbalanceinput[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((balances: INstbalanceinput) =>
      balances.IntitulCompte.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;

  }
}
