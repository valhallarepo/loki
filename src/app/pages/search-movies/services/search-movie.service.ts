import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResponse } from 'src/app/shared/models/paginated.response';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from '../../../../environments/environment';
import { SearchMovieRequest } from '../models/search-movie-request';
import { SearchMovieResponse } from '../models/search-movie-response';

@Injectable({
  providedIn: 'root'
})
export class SearchMovieService extends BaseService<SearchMovieRequest, PaginatedResponse<SearchMovieResponse>> {

  constructor(http: HttpClient) {
    super(http, environment.backends.primary, 'search/movie');
  }

}
