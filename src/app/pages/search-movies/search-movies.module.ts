import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SearchMoviesRoutingModule } from './search-movies-routing.module';
import { SearchMoviesComponent } from './search-movies.component';

@NgModule({
  declarations: [SearchMoviesComponent],
  imports: [
    CommonModule,
    SharedModule,
    SearchMoviesRoutingModule
  ]
})
export class SearchMoviesModule { }
