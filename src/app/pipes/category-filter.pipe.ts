import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(list: any[], text:any): any[] {
    return text != "" && text != undefined ?  list.filter(res => res.title.toLowerCase().includes(text.toLowerCase())) : list;
  }

}
