import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface circuit {
  circuitid: number,
  circuitref: string,
  name: string,
  location: string,
  country: string,
  lat: number,
  lng: number,
  alt: number,
  url: string
}

export interface driver {
  driverid: number,
  driverref: string,
  number: number,
  code: string,
  forename: string,
  surname: string,
  dob: Date,
  nationality: string,
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = "http://192.168.25.233/api";

  constructor(private httpClient: HttpClient) { }

  public getAllDrivers(){
    return this.httpClient.get(this.REST_API_SERVER+"/drivers");
  }

  GetDrivers(): Observable<driver[]>{
    return this.httpClient.get<driver[]>(this.REST_API_SERVER + "/drivers");
  }

  GetCircuits(): Observable<circuit[]>{
    return this.httpClient.get<circuit[]>(this.REST_API_SERVER + "/circuits");
  }
}
