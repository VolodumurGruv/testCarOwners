import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Owners } from '../models/owners.interface';

@Injectable({ providedIn: 'root' })
export class InMemService implements InMemoryDbService {
  createDb() {
    const test = [
      {
        _id: '1',
        surname: 'Ivanov',
        firstName: 'Vasya',
        lastName: 'Petrovich',
        cars: ['5'],
      },
      {
        _id: '2',
        surname: 'Sidorov',
        firstName: 'Petya',
        lastName: 'Ivanovich',
        cars: ['5', '7'],
      },
    ];
    return { test };
  }
}
