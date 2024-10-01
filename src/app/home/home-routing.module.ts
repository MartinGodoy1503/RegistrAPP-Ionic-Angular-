import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'alumno',
    loadChildren: () => import('../modules/alumno/alumno.module').then(m => m.AlumnoModule),
    canActivate: [AuthGuard],
    data: { role: 'alumno' }
  },
  {
    path: 'profesor',
    loadChildren: () => import('../modules/profesor/profesor.module').then(m => m.ProfesorModule),
    canActivate: [AuthGuard],
    data: { role: 'profesor' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
