import { Component, OnChanges, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CarsComponent } from '../shared/components/cars/cars.component';
import { InMemService } from '../shared/helpers/inmem.service';
import { Cars } from '../shared/models/cars.interface';
import { Owners } from '../shared/models/owners.interface';
import { ClientService } from '../shared/services/client.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnChanges {
  counters: number[] = [0];
  owners: any;

  formGroup = new FormGroup({
    aLastName: new FormControl('', [Validators.required]),
    aFirstName: new FormControl('', [Validators.required]),
    aMiddleName: new FormControl('', [Validators.required]),
    aCars: new FormArray([
      new FormGroup({
        regNumber: new FormControl(''),
        brand: new FormControl(''),
        model: new FormControl(''),
        prodYear: new FormControl(''),
      }),
    ]),
  });

  constructor(
    private clientService: ClientService,
    private inmem: InMemService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    console.log(this.getCars());
    console.log(this.formGroup.controls.aCars);
  }

  ngOnChanges() {}

  getOwners() {
    return this.clientService.getOwners().subscribe((b) => (this.owners = b));
  }

  onSubmit() {}

  saveOwner() {
    const { aLastName, aFirstName, aMiddleName, aCars } = this.formGroup.value;
    this.clientService.getOwners().subscribe((b) => (this.owners = b));

    let id = 0;

    // const id: number = this.inmem.genId(this.getCars());

    this.clientService
      .createOwner(id, aLastName, aFirstName, aMiddleName, aCars)
      .subscribe();

    this.router.navigate(['/']);
  }

  // adding new fields for cars

  getCars() {
    return (this.formGroup.get('aCars') as FormArray).controls;
  }

  addCar($event: any) {
    $event.preventDefault();

    (this.formGroup.controls.aCars as FormArray).push(
      new FormGroup({
        regNumber: new FormArray([new FormControl('')]),
        brand: new FormArray([new FormControl('')]),
        model: new FormArray([new FormControl('')]),
        prodYear: new FormArray([new FormControl('')]),
      })
    );
  }

  deleteCar() {
    // this.counters.splice(i, 1);
  }

  getErrorMessage() {
    return 'invalid';
  }
}
