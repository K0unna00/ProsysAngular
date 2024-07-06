import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable, PartialObserver } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(parameters: Partial<RequestParams>) {
    return `${parameters.baseUrl ? parameters.baseUrl : this.baseUrl}/${parameters.controller}/${parameters.action ? parameters.action : ""}`
  }


  getAll<T>(parameters: Partial<RequestParams>): Observable<T[]> {
    let url: string = "";

    if (parameters.fullEndpoint)
      url = parameters.fullEndpoint;
    else
      url = this.url(parameters);

    return this.httpClient.get<T[]>(url, { headers: parameters.headers });
  }

  get<T>(parameters: Partial<RequestParams>, id?: string): Observable<T> {

    let url: string = "";

    if (parameters.fullEndpoint)
      url = parameters.fullEndpoint
    else
      url = `${this.url(parameters)}${id ? `/${id}` : ""}`;

    return this.httpClient.get<T>(url, { headers: parameters.headers })
  }

  post<T>(parameters: Partial<RequestParams>, body: Partial<T>): Observable<T> {
    let url: string = "";

    if (parameters.fullEndpoint)
      url = parameters.fullEndpoint
    else
      url = `${this.url(parameters)}`;

      console.log(url);
      

    return this.httpClient.post<T>(url, body, { headers: parameters.headers });
  }

  put() {}

  delete<T>(parameters: Partial<RequestParams>, id : Partial<string>) {
    let url: string = "";

    if (parameters.fullEndpoint)
      url = parameters.fullEndpoint
    else
      url = `${this.url(parameters)}${id}`;

      return this.httpClient.delete(url,{headers: parameters.headers})
  }
}

export class RequestParams {
  controller?: string;
  action?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
  
}
