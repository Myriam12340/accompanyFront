import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './SignUp Component/login/login.component';
import { RegisterComponent } from './SignUp Component/register/register.component';
import { AdminComponent } from './admin/admin.component';
export const AppRoutes: Routes = [
  {path: 'signup', component: RegisterComponent}, 
   

  {path: 'login', component: LoginComponent}, 
  { path: 'adminsignup', component: AdminComponent},


  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];
