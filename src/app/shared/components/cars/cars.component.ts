import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  carsForm = new FormGroup({
    regNumber: new FormControl(''),
    brand: new FormControl(''),
    model: new FormControl(''),
    prodYear: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}
}
