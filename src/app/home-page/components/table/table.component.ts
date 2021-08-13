import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Owners } from 'src/app/shared/models/owners.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'surname',
    'firstName',
    'lastName',
    'cars',
    'isChecked',
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

  dataSource: MatTableDataSource<any> = new MatTableDataSource(
    this.myDataArray
  );

  chosen = new Set<Owners>();

  // @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  checkRadio($event: any) {
    console.log($event.target.checked);
  }
}
