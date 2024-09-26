import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.page.html',
  styleUrls: ['./not-found-page.page.scss'],
})
export class NotFoundPagePage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back(); // Retrocede a la última ruta
  }
}
