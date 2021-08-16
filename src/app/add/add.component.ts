import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { ClientService } from '../shared/services/client.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  owners: any;

  formGroup = new FormGroup({
    aLastName: new FormControl('', [Validators.required]),
    aFirstName: new FormControl('', [Validators.required]),
    aMiddleName: new FormControl('', [Validators.required]),
    aCars: new FormArray([
      new FormGroup({
        id: new FormControl(`${this.getID()}`),
        regNumber: new FormControl(''),
        brand: new FormControl(''),
        model: new FormControl(''),
        prodYear: new FormControl(''),
      }),
    ]),
  });

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    this.getOwners();
  }

  getOwners() {
    return this.clientService.getOwners().subscribe((b) => (this.owners = b));
  }

  onSubmit() {
    const { aLastName, aFirstName, aMiddleName, aCars } = this.formGroup.value;

    let id = this.owners.length;

    this.clientService
      .createOwner(id, aLastName, aFirstName, aMiddleName, aCars)
      .subscribe();

    this.router.navigate(['/']);
  }

  // adding new fields for cars

  getCars() {
    return (this.formGroup.get('aCars') as FormArray).controls;
  }

  getID() {
    return UUID.UUID();
  }

  addCar() {
    (this.formGroup.controls.aCars as FormArray).push(
      new FormGroup({
        id: new FormControl(`${this.getID()}`),
        regNumber: new FormControl(''),
        brand: new FormControl(''),
        model: new FormControl(''),
        prodYear: new FormControl(''),
      })
    );
  }

  deleteCar(i: number) {
    this.getCars().splice(i, 1);
  }

  getErrorMessage() {
    return 'invalid';
  }
}
