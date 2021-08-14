import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Owners } from 'src/app/shared/models/owners.interface';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'surname',
    'firstName',
    'lastName',
    'cars',
  ];

  myDataArray = [];

  isSelected: any;
  row: any;
  dataSource = new MatTableDataSource<Owners[]>(this.myDataArray);

  // chosen = new Set<Owners>();

  // MATSORT doesnt't work will find out later
  // @ViewChild(MatSort) sort: MatSort;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    console.log(this.clientService.getOwners);
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  delete() {}

  highLight(row: any) {
    if (this.isSelected !== row._id) {
      this.isSelected = row._id;
    } else {
      this.isSelected = null;
    }
  }
}
