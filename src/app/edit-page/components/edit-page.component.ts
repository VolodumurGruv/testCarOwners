import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from 'src/app/shared/models/cars.interface';
import { Owners } from 'src/app/shared/models/owners.interface';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  owner: any;
  id: any;
  cars: any;

  formGroup: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      aLastName: ['', [Validators.required]],
      aFirstName: ['', [Validators.required]],
      aMiddleName: ['', [Validators.required]],
      aCars: this.formBuilder.array([
        this.formBuilder.group({
          regNumber: new FormControl(''),
          brand: new FormControl(''),
          model: new FormControl(''),
          prodYear: new FormControl(''),
        }),
      ]),
    });

    this.formGroup.valueChanges.subscribe((b) => b);

    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getOwner(this.id);
      }
    });
  }

  private getOwner(id: number) {
    this.clientService.getOwnerById(id).subscribe(
      (owner) => this.editOwner(owner),
      (err: any) => console.log(err)
    );
  }

  getCars() {
    return (this.formGroup.get('aCars') as FormArray).controls;
  }

  editOwner(owner: Owners) {
    this.formGroup.patchValue({
      aLastName: owner.aLastName,
      aFirstName: owner.aFirstName,
      aMiddleName: owner.aMiddleName,
      // aCars: owner.aCars.map((elem: any) => {
      //   return {
      //     regNumber: [elem.regNumber],
      //     brand: [elem.brand],
      //     model: [elem.model],
      //     prodYear: [elem.prodYear],
      //   };
      // }),
    });

    this.formGroup.setControl('aCars', this.setAcars(owner.aCars as []));
  }

  setAcars(cars: Cars[]): FormArray {
    const newCarsArray = new FormArray([]);

    cars.forEach((car) =>
      newCarsArray.push(
        this.formBuilder.group({
          regNumber: [car.regNumber],
          brand: [car.brand],
          model: [car.model],
          prodYear: [car.prodYear],
        })
      )
    );

    return newCarsArray;
  }

  addCar() {
    (this.formGroup.controls.aCars as FormArray).push(
      new FormGroup({
        regNumber: new FormControl(''),
        brand: new FormControl(''),
        model: new FormControl(''),
        prodYear: new FormControl(''),
      })
    );
  }

  deleteCar(id: number) {
    this.getCars().splice(id, 1);
  }

  getErrorMessage() {}

  onSubmit() {
    const { aLastName, aFirstName, aMiddleName, aCars } = this.formGroup.value;

    this.clientService.editOwner(this.formGroup.value, this.id).subscribe();

    this.router.navigate(['/']);
  }
}
