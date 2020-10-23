import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageHelper } from 'src/app/shared/helpers/message-helper';
import { SearchMovieRequest } from './models/search-movie-request';
import { SearchMovieResponse } from './models/search-movie-response';
import { SearchMovieService } from './services/search-movie.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatInput) query: MatInput;

  form: FormGroup;

  dataSource: MatTableDataSource<SearchMovieResponse>;
  displayedColumns: Array<string> = ['id', 'original_title', 'title', 'popularity', 'vote_count', 'vote_average'];

  constructor(
    private messageHelper: MessageHelper,
    private searchMovieService: SearchMovieService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SearchMovieResponse>();
    this.dataSource.paginator = this.paginator;

    this.form = new FormGroup({
      id: new FormControl(),
      page: new FormControl(1),
      query: new FormControl('', Validators.required),
      year: new FormControl()
    });
  }

  pesquisar(event?: PageEvent): void {

    if (!this.validarForm()) {
      return;
    }

    const params = this.form.value as SearchMovieRequest;

    if (event) {
      params.page = ++event.pageIndex;
    }

    this.searchMovieService.get(null, params).subscribe(
      res => {
        this.paginator.length = res.totalResults;
        this.dataSource.data = res.results;
      }
    );
  }

  validarForm(): boolean {
    if (this.form.invalid) {
      this.messageHelper.show('GLOBAL.MSG.REQUIRED');
      return false;
    }

    return true;
  }

  limpar(): void {
    this.form.reset();
    this.dataSource.data = [];
    this.dataSource.filteredData = [];

    if (this.paginator) {
      this.paginator.length = 0;
    }
  }

}
