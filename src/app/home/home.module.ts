import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ProfesorComponent } from '../modules/profesor/profesor/profesor.component';
import { AlumnoComponent } from '../modules/alumno/alumno/alumno.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, AlumnoComponent, ProfesorComponent]
})
export class HomePageModule {}
