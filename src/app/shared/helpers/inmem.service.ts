import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Owners } from '../models/owners.interface';

@Injectable({ providedIn: 'root' })
export class InMemService implements InMemoryDbService {
  createDb() {
    const owners = [{}];
    const cars = [{}];

    return { owners, cars };
  }

  genId(owners: Owners[]): number {
    return owners.length > 0
      ? Math.max(...owners.map((owner) => owner.id)) + 1
      : 1;
  }
}
