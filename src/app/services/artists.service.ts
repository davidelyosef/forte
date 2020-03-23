import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';
import { myApp } from '../exports';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private httpClient: HttpClient) { }

  public getAllArtists(): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>(myApp.url + "/api/artists");
  }

  public getOneArtist(fullName): Observable<Artist> {
    return this.httpClient.get<Artist>(myApp.url + '/api/artists/' + fullName);
  }

  public deleteOneArtist(artistID): Observable<Artist> {
    return this.httpClient.delete<Artist>(myApp.url + '/api/artists/' + artistID);
  }

  public updateArtist(artistsID, artist): Observable<Artist> {
    return this.httpClient.patch<Artist>(myApp.url + '/api/artists/' + artistsID, artist);
  }

  public addArtist(artist): Observable<Artist> {
    return this.httpClient.post<Artist>(myApp.url + '/api/artists', artist);
  }

  public postImage(image): any {
    return this.httpClient.post(myApp.url + "/upload-image", image);
  }

  public patchImage(image): any {
    return this.httpClient.patch(myApp.url + "/update-image", image);
  }

  public addArtistWithFiles(artist): Observable<Artist> {
    return this.httpClient.post(myApp.url + '/add-artist', artist);
  }

  public updateArtistWithFiles(artist): Observable<Artist> {
    return this.httpClient.patch<Artist>(myApp.url + '/update-artist-cropped-image', artist);
  }

  public addArtistResume(pdf): Observable<any> {
    return this.httpClient.post(myApp.url + '/add-resume-artist', pdf);
  }

  public updateArtistResume(pdf): Observable<any> {
    return this.httpClient.patch(myApp.url + '/update-resume-artist', pdf);
  }

  public deleteArtistResume(pdf): Observable<any> {
    return this.httpClient.delete(myApp.url + '/delete-resume-artist/' + pdf);
  }
}





