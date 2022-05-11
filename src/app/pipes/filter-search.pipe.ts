import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(list: any[], text:any): any[] {
    
    return text != "" && text != undefined ?  list.filter(res => res.model.toLowerCase().includes(text.toLowerCase())) : list;


}

}
