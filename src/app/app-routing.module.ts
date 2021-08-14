import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OwnersComponent } from './shared/components/owners/owners.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () =>
          import('./home-page/home-page.module').then((m) => m.HomePageModule),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./edit-page/edit-page.module').then((m) => m.EditPageModule),
      },
      {
        path: 'add',
        loadChildren: () => import('./add/add.module').then((m) => m.AddModule),
      },
      {
        path: 'view/:id',
        component: OwnersComponent,
      },
      {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
