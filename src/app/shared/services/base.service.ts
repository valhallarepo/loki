import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

export class BaseService<Req, Resp> {

  private httpClient: HttpClient;
  private key: string;
  private url: string;
  private mainResource: string;

  constructor(http: HttpClient, backend: any, resource: string) {
    this.httpClient = http;
    this.key = backend.apiKey;
    this.url = backend.baseUrl;
    this.mainResource = resource;
  }

  protected get http(): HttpClient {
    return this.httpClient;
  }

  protected get apiKey(): string {
    return this.key;
  }

  protected get baseUrl(): string {
    return this.url;
  }

  protected get resource(): string {
    return this.mainResource;
  }

  /**
   * Implementação do verbo DELETE
   * Exclusão de um registro com base no 'ID' do registro.
   */
  delete(id: number | string): Observable<Resp> {
    return this.http.delete<Resp>(`${this.baseUrl}/${this.resource}/${id}`, this.getHttpOptions());
  }

  /**
   * Implementação do verbo GET.
   * Recuperação de registros com base nos fitros informados.
   */
  private find(data?: Req): Observable<Resp> {
    const options = this.getHttpOptions() as any;

    if (data) {
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          options.params = options.params.set(key, data[key]);
        }
      });
    }

    return this.http.get<Resp>(`${this.baseUrl}/${this.resource}`, options as object);
  }

  /**
   * Implementação do verbo GET.
   * Recuperação de registros com base no 'ID' ou nos filtros informados.
   */
  get(id?: number | string, data?: Req): Observable<Resp> {

    if (id) {
      return this.http.get<Resp>(`${this.baseUrl}/${this.resource}/${id}`, this.getHttpOptions());
    }

    return this.find(data);
  }

  /**
   * Implementação do verbo POST.
   * Criação de um novo registro, o 'ID' NÃO deve ser submetido na requisição.
   */
  post(data: Req): Observable<Resp> {
    return this.http.post<Resp>(`${this.baseUrl}/${this.resource}`, data, this.getHttpOptions());
  }

  /**
   * Implementação do verbo PATCH.
   * Atualização parcial do registro, o 'ID' DEVE ser submetido na requisição.
   */
  patch(id: number | string, data: Req): Observable<Resp> {
    return this.http.patch<Resp>(`${this.baseUrl}/${this.resource}/${id}`, data, this.getHttpOptions());
  }

  /**
   * Implementação do verbo PUT.
   * Atualização completa do registro, o 'ID' deve ser submetido na requisição.
   */
  put(id: number | string, data: Req): Observable<Resp> {
    return this.http.put<Resp>(`${this.baseUrl}/${this.resource}/${id}`, data, this.getHttpOptions());
  }

  /**
   * Recupera os Options da requisição
   */
  private getHttpOptions(): object {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
    };

    httpOptions.params = httpOptions.params.set('api_key', this.apiKey);

    return httpOptions;
  }

}
