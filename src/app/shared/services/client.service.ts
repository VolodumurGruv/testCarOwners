import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owners } from '../models/owners.interface';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  getOwners(): Observable<Owners[]> {
    return this.httpClient
      .get<Owners[]>('/commands')
      .pipe(tap((b: any) => console.log(b)));
  }
}
