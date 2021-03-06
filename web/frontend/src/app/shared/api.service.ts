import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import { environment } from '../../environments/environment';

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

export interface constructor {
  constructorid: number,
  constructorref: string,
  name: string,
  nationality: string,
  url: string
}

export interface race {
  raceid: number,
  year: number,
  round: number,
  circuitid: number,
  name: string,
  date: Date,
  time: Time,
  url: string
}

export interface result {
  resultid: number,
  raceid: number,
  driverid: number,
  constructorid: number,
  number: number,
  grid: number,
  position: number,
  positiontext: string,
  points: number,
  laps: number,
  time: string,
  milliseconds: number,
  fastestlap: number,
  rank: number,
  fastestlaptime: string,
  fastestlapspeed: string,
  statusid: number
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = `http://${environment.APP_HOSTNAME}:3002`;
  private DB_STATUS_SERVER = `http://${environment.DB_HOSTNAME}:3004`;
  private APP_STATUS_SERVER = `http://${environment.APP_HOSTNAME}:3003`;
  private WEB_STATUS_SERVER = `http://${environment.WEB_HOSTNAME}:3001`;

  constructor(private httpClient: HttpClient) { }

  GetDrivers(): Observable<driver[]>{
    return this.httpClient.get<driver[]>(this.REST_API_SERVER + "/drivers");
  }

  GetDriver(driverId): Observable<driver>{
    return this.httpClient.get<driver>(this.REST_API_SERVER + "/drivers/" + driverId);
  }

  GetDriverDetails(driverId): Observable<any[]>{
    return this.httpClient.get<any[]>(this.REST_API_SERVER + "/drivers/" + driverId + "/results");
  }

  GetCircuits(): Observable<circuit[]>{
    return this.httpClient.get<circuit[]>(this.REST_API_SERVER + "/circuits");
  }

  GetRaces(): Observable<race[]>{
    return this.httpClient.get<race[]>(this.REST_API_SERVER + "/races");
  }

  GetResults(): Observable<result[]>{
    return this.httpClient.get<result[]>(this.REST_API_SERVER + "/results");
  }

  GetConstructors(): Observable<constructor[]>{
    return this.httpClient.get<constructor[]>(this.REST_API_SERVER + "/constructors");
  }

  GetFromName(driverName: string): Observable<any[]>{
    return this.httpClient.get<any[]>(this.REST_API_SERVER + '/imagelink/' + driverName);
  }

  GetStatusDb(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.DB_STATUS_SERVER);
  }

  GetStatusApp(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.APP_STATUS_SERVER);
  }

  GetStatusWeb(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.WEB_STATUS_SERVER);
  }

}
