import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resturant-detail',
  templateUrl: './resturant-detail.component.html',
  styleUrls: ['./resturant-detail.component.scss'],
})
export class ResturantDetailComponent implements OnInit {
  @Input() data: any;
  @Input() isLoading;
  constructor() {}

  ngOnInit() {}
  getCuisine(cuisine) {
    return cuisine.join(', ');
  }
}
