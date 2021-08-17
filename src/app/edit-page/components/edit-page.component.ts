import { splitClasses } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Cars } from 'src/app/shared/models/cars.interface';
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
    this.route.params
      .pipe((p: Params) => {
        this.id = +p.value['id'];
        return this.clientService.getOwnerById(p.value['id']);
      })
      .subscribe((owner: any) => {
        this.owner = owner;

        this.cars = owner.aCars;

        console.log(this.cars);

        this.formGroup = this.formBuilder.group({
          aLastName: [owner?.aLastName, [Validators.required]],
          aFirstName: [owner?.aFirstName, [Validators.required]],
          aMiddleName: [owner?.aMiddleName, [Validators.required]],
          aCars: this.formBuilder.array([
            this.cars.map((car: any) => {
              return this.formBuilder.group({
                regNumber: new FormControl(car?.regNumber),
                brand: new FormControl(car?.brand),
                model: new FormControl(car?.model),
                prodYear: new FormControl(car?.prodYear),
              });
            }),
          ]),
        });
      });

    this.formGroup.patchValue({ aFirstName: 'Name' });
  }

  getCars() {
    return (this.formGroup.get('aCars') as FormArray).controls;
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
