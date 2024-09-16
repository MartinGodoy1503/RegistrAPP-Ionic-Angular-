import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotFoundPagePageRoutingModule } from './not-found-page-routing.module';

import { NotFoundPagePage } from './not-found-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotFoundPagePageRoutingModule
  ],
  declarations: [NotFoundPagePage]
})
export class NotFoundPagePageModule {}
