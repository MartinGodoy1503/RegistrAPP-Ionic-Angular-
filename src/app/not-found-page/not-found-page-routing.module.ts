import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPagePage } from './not-found-page.page';

const routes: Routes = [
  {
    path: '',
    component: NotFoundPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundPagePageRoutingModule {}
