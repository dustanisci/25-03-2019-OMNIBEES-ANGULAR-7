import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _headers: HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json');
  private _request: HttpParams = new HttpParams();

  constructor(private http: HttpClient) { }

  public _setHeaders(request?): void {
    if (request) {
      this._request = {} as HttpParams;
      Object.keys(request).map(key => {
        this._request.append(key, request[key]);
      });
    }
  }

  public get(url: string, request?): Observable<any> {
    this._setHeaders(request);
    return this.http.get<any>(url, { headers: this._headers, params: this._request });
  }

  public post(url: string, value: any, request?): Observable<any> {
    this._setHeaders(request);
    return this.http.post<any>(url, value, { headers: this._headers, params: this._request });
  }

  public put(url: string, id: any, value: any, request?): Observable<any> {
    this._setHeaders(request);
    return this.http.put(`${url}/${id}`, value, { headers: this._headers, params: this._request });
  }

  public delete(url: string, id: any, request?): Observable<any> {
    this._setHeaders(request);
    return this.http.delete(`${url}/${id}`, { headers: this._headers, params: this._request });
  }

}
