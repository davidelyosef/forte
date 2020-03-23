import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyEvent } from '../models/event';
import { myApp } from '../exports';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  public getAllEvents(): Observable<MyEvent[]> {
    return this.httpClient.get<MyEvent[]>(myApp.url + '/api/events');
  }

  public deleteOneEvent(eventID): Observable<MyEvent> {
    return this.httpClient.delete<MyEvent>(myApp.url + "/api/events/" + eventID)
  }

  public updateEvent(eventID, event): Observable<Event> {
    return this.httpClient.patch<Event>(myApp.url + '/api/events/' + eventID, event);
  }

  public addEvent(event): Observable<Event> {
    return this.httpClient.post<Event>(myApp.url + '/api/events', event);
  }

  public updateEventImage(image): any {
    return this.httpClient.patch(myApp.url + '/update-event-image', image);
  }

  public addEventImage(image): any {
    return this.httpClient.post(myApp.url + '/add-event-image', image);
  }

  public addEventImageToArray(image): any {
    return this.httpClient.patch(myApp.url + '/add-event-image-to-array', image);
  }
}
