export class SearchMovieRequest {

    id: number | string;
    page: number;
    query: string;
    includeAdult = false;
    year: number;

}
