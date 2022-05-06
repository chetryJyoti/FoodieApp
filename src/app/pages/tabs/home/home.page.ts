import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  banners: any[] = [];
  resturants: any[] = [];
  isLoading?: boolean = false;


  constructor() {}

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.banners = [
        { banner: '/assets/imgs/food1.jpg' },
        { banner: '/assets/imgs/food2.jpg' },
        { banner: '/assets/imgs/food3.jpg' },
        { banner: '/assets/imgs/food4.jpg' },
        { banner: '/assets/imgs/food5.jpg' },
      ];
      this.resturants = [
        {
          uid:'12wefdss',
          cover: 'assets/imgs/food1.jpg',
          name: 'StayFit',
          shortName:'stayfit',
          cuisines: ['Italian', 'Mexican'],
          rating: 5,
          deliveryTime: 45,
          price: 200,
          distance: 2.3,
        },
        {
          uid:'213dhgfjdf',
          cover: 'assets/imgs/food2.jpg',
          name: 'Food Lovers',
          shortName:'foodlovers',
          cuisines: ['Italian', 'Mexican'],
          rating: 5,
          deliveryTime: 35,
          price: 200,
          distance: 2.3,
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
          distance: 2.3,
        },
      ];
      this.isLoading = false;
    },1000);
  }
}
