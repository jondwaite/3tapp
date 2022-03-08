import { Inject, Injectable, Optional } from "@angular/core"
import { BehaviorSubject, interval } from "rxjs"
import { HttpClient } from "@angular/common/http";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ConnectionService {
  public connected$ = new BehaviorSubject<boolean>(false);
  public url: string;
  public connState: boolean;
  private source = interval(1000);

  constructor(
    private _http: HttpClient,
    @Inject('hostname') @Optional() public hostname?: string,
    @Inject('port') @Optional() public port?: number
    ) {

    this.hostname = hostname || 'localhost';
    this.port = port || 3000;

    this.url = 'http://' + this.hostname + ':' + this.port

    this.source.subscribe(() => {
      this._http.get(this.url, { observe: 'response' })
        .pipe(first())
        .subscribe(resp => {
          if (resp.status === 200) {
            this.connected(true);
          } else {
            this.connected(false);
          }
        }), err => this.connected(false);
    });

    this.connected$.subscribe(connected => {
      console.log("Connected: ", connected);
    });
  }

  connected(data: boolean) {
    this.connState = data;
    this.connected$.next(this.connState);
  }

}
