import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EditPageComponent } from './components/edit-page.component';
import { EditPageRoutingModule } from './edit-page-routing.module';

@NgModule({
  declarations: [EditPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class EditPageModule {}
