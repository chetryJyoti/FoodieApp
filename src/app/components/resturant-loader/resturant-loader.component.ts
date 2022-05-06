import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resturant-loader',
  templateUrl: './resturant-loader.component.html',
  styleUrls: ['./resturant-loader.component.scss'],
})
export class ResturantLoaderComponent implements OnInit {
  dummy = Array(10);
  constructor() {}

  ngOnInit() {}
}
