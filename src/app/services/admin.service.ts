import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';
import { myApp } from 'src/app/exports';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  public getAdmins(): Observable<Admin[]> {
    return this.httpClient.get<Admin[]>(myApp.url + '/api/admins/875sadf8sdfsdfsd5fsdfgsdf85sd');
  }
}
