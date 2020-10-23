import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { SearchMoviesComponent } from './search-movies.component';
import { SearchMovieService } from './services/search-movie.service';

describe('SearchMoviesComponent', () => {
  let component: SearchMoviesComponent;
  let fixture: ComponentFixture<SearchMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [SearchMoviesComponent],
      providers: [SearchMovieService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Colunas Visíveis', () => {
    const displayedColumns = ['id', 'original_title', 'title', 'popularity', 'vote_count', 'vote_average'];
    expect(component.displayedColumns).toEqual(displayedColumns);
  });

  it('Pesquisar', () => {
    expect(component.pesquisar()).toBeUndefined();
    expect(component.pesquisar({ pageIndex: 1 } as PageEvent)).toBeUndefined();
    component.form.get('query').setValue('Batman');
    expect(component.pesquisar()).toBeUndefined();
    expect(component.pesquisar({ pageIndex: 1 } as PageEvent)).toBeUndefined();
  });

  it('Validar Form', () => {
    expect(component.validarForm()).toBeFalse();
    component.form.get('query').setValue('Batman');
    expect(component.validarForm()).toBeTrue();
  });

  it('Limpar', () => {
    expect(component.limpar()).toBeUndefined();
    component.paginator = {} as MatPaginator;
    expect(component.limpar()).toBeUndefined();
  });

});
