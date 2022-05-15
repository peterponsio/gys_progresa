import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {

  transform(list: any[], text:any): any[] {
    return text != "" && text != undefined ?  list.filter(res => res.nm.toLowerCase().includes(text.toLowerCase())) : list;
  }

}
