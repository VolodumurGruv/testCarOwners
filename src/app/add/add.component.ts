import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Cars } from '../shared/models/cars.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  counters: number[] = [];

  formGroup = new FormGroup({
    surname: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    cars: new FormGroup({
      regNumber: new FormControl(''),
      brand: new FormControl(''),
      model: new FormControl(''),
      prodYear: new FormControl(''),
    }),
  });

  constructor() {}

  ngOnInit() {}

  onSubmit() {}
  // console.log(UUID.UUID());

  // adding new fields for cars
  get isCars() {
    return this.formGroup.get('cars') as FormControl;
  }

  addCar() {
    this.counters.push(0);
  }

  deleteCar(i: any) {
    console.log(i);
    this.counters.splice(i, 1);
  }

  getErrorMessage() {
    return 'invalid';
  }
}
