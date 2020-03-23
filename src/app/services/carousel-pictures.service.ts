import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myApp } from '../exports';

@Injectable({
  providedIn: 'root'
})
export class CarouselPicturesService {

  constructor(private httpClient: HttpClient) { }

  public getAllCarouselPictures(): Observable<[]> {
    return this.httpClient.get<[]>(myApp.url + "/api/carousel");
  }

  public deleteOneCarouselPicture(carouselPictureID): Observable<[]> {
    return this.httpClient.delete<any>(myApp.url + "/api/carousel/" + carouselPictureID)
  }

  public updateCarouselPicture(carouselPictureID, carouselImage): Observable<any> {
    return this.httpClient.patch<any>(myApp.url + "/api/carousel/" + carouselPictureID, carouselImage);
  }

  public addCarouselPicture(carouselPicture): Observable<{}> {
    return this.httpClient.post<any>(myApp.url + "/api/carousel", carouselPicture);
  }

  // the image only
  public updateCarouselImage(image): any {
    return this.httpClient.patch(myApp.url + '/update-carousel-image', image);
  }

  public addCarouselImage(image): any {
    return this.httpClient.post(myApp.url + '/add-carousel-image', image);
  }
}