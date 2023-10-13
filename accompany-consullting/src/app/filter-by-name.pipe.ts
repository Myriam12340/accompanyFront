// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], term: string, filterType: string): any[] {
    if (!items || (!term && !filterType)) {
      return items;
    }

    term = term ? term.toLowerCase() : '';

    return items.filter(item => {
      if (filterType === 'name') {
        return item.demandeurnom.toLowerCase().includes(term);
      } else if (filterType === 'month') {
        const congeDate = new Date(item.dateDebut);
        const monthName = congeDate.toLocaleString('en-us', { month: 'long' }).toLowerCase();
        return monthName.includes(term);
      } else {
        return true; // No filter
      }
    });
  }
}
