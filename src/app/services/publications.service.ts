import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publication } from '../models/publication';
import { Observable } from 'rxjs';
import { myApp } from '../exports';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private httpClient: HttpClient) { }

  public getAllPublications(): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(myApp.url + "/api/publications");
  }

  public getOnePublication(id): Observable<Publication> {
    return this.httpClient.get<Publication>(myApp.url + "/api/publications/" + id);
  }

  public deleteOnePublication(publicationID): Observable<Publication> {
    return this.httpClient.delete<Publication>(myApp.url + "/api/publications/" + publicationID)
  }

  public updatePublication(publicationID, publication): Observable<Publication> {
    return this.httpClient.patch<Publication>(myApp.url + '/api/publications/' + publicationID, publication);
  }

  public addPublication(publication): Observable<Publication> {
    return this.httpClient.post<Publication>(myApp.url + '/api/publications', publication);
  }

  public patchImage(image): any {
    return this.httpClient.patch(myApp.url + "/update-publication-file", image);
  }

  public addPublicationImage(img): any {
    return this.httpClient.patch(myApp.url + '/add-publication-image', img);
  }

  public addPublicationWithFiles(publication): Observable<Publication> {
    return this.httpClient.post<Publication>(myApp.url + '/add-publication', publication);
  }
}