import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Owners } from '../models/owners.interface';
import { catchError, retry, tap } from 'rxjs/operators';
import { Cars } from '../models/cars.interface';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  getOwners(): Observable<Owners[]> {
    return this.httpClient.get<Owners[]>('api/owners').pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createOwner(
    id: number,
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: Cars[]
  ): Observable<Owners[]> {
    const owner = { id, aLastName, aFirstName, aMiddleName, aCars: [aCars] };
    return this.httpClient.post<Owners[]>('api/owners', owner).pipe(
      tap((b) => console.log(b)),
      catchError((error: HttpErrorResponse) => {
        console.error(error);

        return throwError(error);
      })
    );
  }

  editOwner(owner: Owners): Observable<any> {
    return this.httpClient.put(`api/owners/${owner.id}`, owner);
  }

  deleteOwner(id: number): Observable<any> {
    return this.httpClient.delete(`api/owners/${id}`);
  }
}
