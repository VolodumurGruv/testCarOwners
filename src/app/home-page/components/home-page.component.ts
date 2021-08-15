import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
    'aLastName',
    'aFirstName',
    'aMiddleName',
    'aCars',
  ];

  myDataArray: any[] = [];

  isSelected: any;
  row: any;
  dataSource: any;

  // chosen = new Set<Owners>();

  // MATSORT doesnt't work will find out later
  // @ViewChild(MatSort) sort: MatSort;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.clientService.getOwners().subscribe((b) => (this.myDataArray = b));
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<Owners[]>(this.myDataArray);
      console.log(this.myDataArray.splice(0, 1));
    }, 2000);
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  goToView() {
    this.router.navigate(['edit/', this.isSelected]);
  }

  goToEdit() {
    this.router.navigate(['view/', this.isSelected]);
  }

  delete() {
    //   this.clientService.deleteOwner(id).subscribe();
  }

  highLight(row: any) {
    console.log(row);
    if (this.isSelected !== row.id) {
      this.isSelected = row.id;
    } else {
      this.isSelected = null;
    }
  }
}
