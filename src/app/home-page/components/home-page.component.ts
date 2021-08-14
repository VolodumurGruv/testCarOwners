import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Owners } from 'src/app/shared/models/owners.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  displayedColumns: string[] = [
    'id',
    'surname',
    'firstName',
    'lastName',
    'cars',
  ];

  myDataArray: Owners[] = [
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

  isSelected: any;
  row: any;

  dataSource = new MatTableDataSource(this.myDataArray);

  chosen = new Set<Owners>();

  // MATSORT doesnt't work will find out later
  // @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  highLight(row: any) {
    if (this.isSelected !== row._id) {
      this.isSelected = row._id;
    } else {
      this.isSelected = '';
    }
  }
}
