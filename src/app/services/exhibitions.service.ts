import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exhibition } from '../models/exhibition';
import { myApp } from '../exports';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionsService {

  constructor(private httpClient: HttpClient) { }

  public getAllExhibitions(): Observable<Exhibition[]> {
    return this.httpClient.get<Exhibition[]>(myApp.url + "/api/exhibitions");
  }

  public getOneExhibition(id): Observable<Exhibition> {
    return this.httpClient.get<Exhibition>(myApp.url + "/api/exhibitions/" + id);
  }

  public deleteOneExhibition(exhibitionID): Observable<Exhibition> {
    return this.httpClient.delete<Exhibition>(myApp.url + "/api/exhibitions/" + exhibitionID)
  }

  public updateExhibition(exhibitionID, exhibition): Observable<Exhibition> {
    return this.httpClient.patch<Exhibition>(myApp.url + '/api/exhibitions/' + exhibitionID, exhibition);
  }

  public addExhibition(exhibition): Observable<Exhibition> {
    return this.httpClient.post<Exhibition>(myApp.url + '/api/exhibitions', exhibition);
  }

  public addExhibitionImage(image): any {
    return this.httpClient.post(myApp.url + '/add-exhibition-image', image);
  }

  public addNewExhibitionImageToArray(image): any {
    return this.httpClient.patch(myApp.url + '/add-new-exhibition-image', image);
  }

  public updateExhibitionMainDetailsImage(image): Observable<Exhibition> {
    return this.httpClient.patch(myApp.url + '/updte-exhibition-cover', image);
  }

}