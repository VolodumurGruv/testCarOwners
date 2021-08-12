import { NgModule } from '@angular/core';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './components/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomePageComponent],
  imports: [HomePageRoutingModule, MatButtonModule, MatIconModule],
})
export class HomePageModule {}
