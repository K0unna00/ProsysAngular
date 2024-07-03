import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient : HttpClient, @Inject("baseUrl") private baseUrl: string ) { }
  
  get<T>(parameters : Partial<RequestParams>){

    let url : string = "";

    url = `${this.baseUrl}/${parameters.controller}/${parameters.action}`;

  } 

  post(){

  }

  put(){

  }

  delete(){
    
  }
}

export class RequestParams{
  controller? : string;
  action? : string;

  headers? : HttpHeaders;
  baseUrl? : string;
  fullEndpoint? : string;
}
