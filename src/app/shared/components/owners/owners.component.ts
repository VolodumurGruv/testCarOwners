import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Owners } from '../../models/owners.interface';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss'],
})
export class OwnersComponent implements OnInit {
  id: any;
  owner: any;
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe((p: Params) => this.clientService.getOwnerById(p.value['id']))
      .subscribe((owner) => {
        this.owner = [owner];
        console.log(this.owner);
      });
  }
}
