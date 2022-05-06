import { Component, OnInit, ViewChild } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  model: any = {
    icon: 'search-outline',
    title: 'No resturants found!',
  };
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('searchInput') sInput;
  isLoading: boolean;
  query: any;
  resturants: any[] = [];

  allResturants: any[] = [
    {
      uid:'12wefdss',
      cover: 'assets/imgs/food1.jpg',
      name: 'StayFit',
      shortName:'stayfit',
      cuisines: ['Italian', 'Mexican'],
      rating: 5,
      deliveryTime: 45,
      price: 200,
      // distance: 2.3,
    },
    {
      uid:'213dhgfjdf',
      cover: 'assets/imgs/food2.jpg',
      name: 'Food Lovers',
      shortName:'foodlovers',
      cuisines: ['Italian', 'Mexican'],
      rating: 5,
      deliveryTime: 45,
      price: 200,
      // distance: 2.3,
    },
    {
      uid:'7889hdjjfh',
      cover: 'assets/imgs/food3.jpg',
      name: 'StayFit3',
      shortName:'stayfit3',
      cuisines: ['Italian', 'Mexican'],
      rating: 5,
      deliveryTime: 45,
      price: 200,
      // distance: 2.3,
    },
  ];


  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 200);
  }

  async onSearchChange(event) {
    // console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.resturants=[];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async () => {
        this.resturants = await this.allResturants.filter((element: any) =>
          element.shortName.includes(this.query)
        );
        // console.log(this.resturants);
        this.isLoading = false;
      }, 2000);
    }
  }
}
