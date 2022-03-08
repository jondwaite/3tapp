import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, interval  } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-testurl',
  templateUrl: './testurl.component.html',
  styleUrls: ['./testurl.component.scss']
})
export class TesturlComponent implements OnInit {

  @Input() host = 'testapp01-app';
  @Input() port = 3002;
  public connected$ = new BehaviorSubject<boolean>(false);
  public connState: boolean;
  private source = interval(1000);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const url = 'http://' + this.host + ':' + this.port;
    console.log(url);
    this.source.subscribe(() => {
      this.http.get(url, { observe: 'response' })
        .pipe(first())
        .subscribe(resp => {
          if (resp.status === 200) {
            this.connected(true);
          } else {
            this.connected(false);
          }
        }), err => {
          this.connected(false);
        }
    });
    // this.connected$.subscribe(connected => {
    //   console.log("Connected: ", this.host, connected);
    // });
  }

  connected(data: boolean) {
    this.connState = data;
    this.connected$.next(this.connState);
  };
}
