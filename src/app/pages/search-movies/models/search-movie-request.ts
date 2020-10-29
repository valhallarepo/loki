export class SearchMovieRequest {

    id: number | string;
    page: number;
    query: string;
    include_adult = false;
    year: number;

}
