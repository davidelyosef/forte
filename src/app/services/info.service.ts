import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Info } from '../models/info';
import { myApp } from '../exports';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private httpClient: HttpClient) { }

  public getInfo(): Observable<Info[]> {
    return this.httpClient.get<Info[]>(myApp.url + "/api/info");
  }

  public updateInfo(id, info): Observable<Info> {
    return this.httpClient.patch<Info>(myApp.url + '/api/info/' + id, info);
  }

  public updateInfoImage(image): any {
    return this.httpClient.patch(myApp.url + '/update-info-image', image);
  }
}
