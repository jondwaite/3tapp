import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = "http://192.168.25.233/api";

  constructor(private httpClient: HttpClient) { }

  public getAllDrivers(){
    return this.httpClient.get(this.REST_API_SERVER+"/drivers");
  }
}
