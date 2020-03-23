import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscribe } from '../models/subscribe';
import { myApp } from '../exports';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(private httpClient: HttpClient) { }

  public getAllSubscriptions(): Observable<Subscribe[]> {
    return this.httpClient.get<Subscribe[]>(myApp.url + '/api/subscription');
  }

  public getOneSubscription(id): Observable<Subscribe> {
    return this.httpClient.get<Subscribe>(myApp.url + "/api/subscription/" + id);
  }

  public addSubscription(sub): Observable<Subscribe> {
    return this.httpClient.post<Subscribe>(myApp.url + "/api/subscription", sub);
  }

  public deleteSubscribe(id): Observable<Subscribe> {
    return this.httpClient.delete<Subscribe>(myApp.url + '/api/subscription/' + id);
  }

  public deleteAllSubscribes(): Observable<Subscribe[]> {
    return this.httpClient.delete<Subscribe[]>(myApp.url + '/api/subscription/');
  }
}
