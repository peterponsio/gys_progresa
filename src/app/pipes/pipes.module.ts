import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSearchPipe } from './filter-search.pipe';
import { CategoryFilterPipe } from './category-filter.pipe';
import { CountryFilterPipe } from './country-filter.pipe';



@NgModule({
  declarations: [FilterSearchPipe, CategoryFilterPipe, CountryFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FilterSearchPipe,CategoryFilterPipe,CountryFilterPipe
  ]
})
export class PipesModule { }
