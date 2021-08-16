import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
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

  myDataArray: any;

  isSelected: any;
  row: any;
  dataSource: any;

  // chosen = new Set<Owners>();

  // MATSORT doesnt't work will find out later
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.getOwners();

    setTimeout(() => {
      this.myDataArray.splice(0, 1);

      this.dataSource = new MatTableDataSource<Owners[]>(this.myDataArray);
    }, 2000);
  }

  ngAfterViewInit() {
    setTimeout(() => (this.dataSource.sort = this.sort), 3000);
  }

  private getOwners() {
    this.clientService.getOwners().subscribe((res) => (this.myDataArray = res));
  }

  goToView() {
    this.router.navigate(['edit/', this.isSelected]);
  }

  goToEdit() {
    this.router.navigate(['view/', this.isSelected]);
  }

  delete() {
    const id = this.isSelected - 1;

    console.log(this.myDataArray);

    this.clientService.deleteOwner(id).subscribe(() => {
      this.myDataArray.filter((data: any) => data.id != id);
      this.clientService.getOwners().subscribe((res) => {
        res.splice(id, 1);
        this.myDataArray = res;
        console.log(this.myDataArray);
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  highLight(row: any) {
    if (this.isSelected !== row.id) {
      this.isSelected = row.id;
    } else {
      this.isSelected = null;
    }
  }
}
