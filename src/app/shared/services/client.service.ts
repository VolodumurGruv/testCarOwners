import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Owners } from '../models/owners.interface';
import { catchError, map, retry } from 'rxjs/operators';
import { Cars } from '../models/cars.interface';

@Injectable({ providedIn: 'root' })
export class ClientService {
  URL: string = 'api/owners';
  constructor(private httpClient: HttpClient) {}

  getOwners(): Observable<Owners[]> {
    return this.httpClient.get<Owners[]>(`${this.URL}`).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getOwnerById(id: number) {
    return this.httpClient.get<Owners[]>(`${this.URL}`).pipe(
      // retry(2),
      map((owner: any) => {
        return owner[id];
      }),
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
    const owner = { id, aLastName, aFirstName, aMiddleName, aCars };
    return this.httpClient.post<Owners[]>(`${this.URL}`, owner).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);

        return throwError(error);
      })
    );
  }

  save(owner: Owners[]): Observable<Owners[]> {
    return this.httpClient.post<Owners[]>(`${this.URL}`, owner).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);

        return throwError(error);
      })
    );
  }

  editOwner(owner: Owners, id: number): Observable<Owners[]> {
    console.log(owner);
    return this.httpClient.put<Owners[]>(`${this.URL}/${id}`, owner);
  }

  deleteOwner(id: number): Observable<Owners[]> {
    return this.httpClient.delete<Owners[]>(`${this.URL}/${id}`).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.error(error);

        return throwError(error);
      })
    );
  }
}
