import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',

  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  id: any;
  data: any = {};
  items: any[] = [];
  catagories: any[] = [];
  veg = false;
  isLoading: boolean;
  cartData: any = {};
  storedData: any = {};
  model={
    icon:'fast-food-outline',
    title:'No Menu available for this resturant',
    subTitle:'Will be available soon!'
  };
  resturants = [
    {
      uid: '12wefdss',
      cover: 'assets/imgs/food1.jpg',
      name: 'StayFit',
      shortName: 'stayfit',
      cuisines: ['Italian', 'Mexican'],
      rating: 5,
      deliveryTime: 45,
      price: 200,
      distance: 2.3,
      address: 'Jorhat,Assam',
    },
    {
      uid: '213dhgfjdf',
      cover: 'assets/imgs/food2.jpg',
      name: 'Food Lovers',
      shortName: 'foodlovers',
      cuisines: ['Italian', 'Mexican'],
      rating: 5,
      deliveryTime: 45,
      price: 200,
      distance: 2.3,
      address: 'ledo,Assam',
    },
    {
      uid: '7889hdjjfh',
      cover: 'assets/imgs/food3.jpg',
      name: 'StayFit3',
      shortName: 'stayfit3',
      cuisines: ['Italian', 'Mexican'],
      rating: 5,
      deliveryTime: 45,
      price: 200,
      distance: 2.3,
      address: 'Borpeta,Assam',
    },
  ];
  categories: any[] = [
    {
      id: 'e00',
      name: 'Italian',
      uid: '12wefdss',
    },
    {
      id: 'e0',
      name: 'Mexican',
      uid: '12wefdss',
    },
  ];

  allItems = [
    {
      category_id: 'e00',
      cover: 'assets/imgs/pizza.jpg',
      desc: 'Great in taste ',
      id: 'i1',
      name: 'Pizza',
      price: 120.5,
      rating: 0,
      status: true,
      uid: '12wefdss',
      variation: false,
      veg: false,
    },
    {
      category_id: 'e0',
      cover: 'assets/imgs/salad.jpg',
      desc: 'Great in taste',
      id: 'i2',
      name: 'Caprese Salad',
      price: 200.22,
      rating: 0,
      status: true,
      uid: '12wefdss',
      variation: false,
      veg: true,
    },
    {
      category_id: 'e00',
      cover: 'assets/imgs/pasta.jpg',
      desc: 'Great in taste',
      id: 'i3',
      name: 'Pasta',
      price: 150,
      rating: 0,
      status: true,
      uid: '12wefdss',
      variation: false,
      veg: false,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      // console.log('data:',paramMap);
      if (!paramMap.has('resturantId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('resturantId');
      console.log('id:', this.id);
      this.getItems();
    });
  }

  getCart() {
    return Storage.get({ key: 'cart' });
  }
  async getItems() {
    this.isLoading = true;
    this.data = {};
    this.cartData = {};
    this.storedData = {};
    setTimeout(async () => {
      const data: any = this.resturants.filter((x) => x.uid === this.id);
      this.data = data[0];
      this.categories = this.categories.filter((x) => x.uid === this.id);
      this.items = this.allItems.filter((x) => x.uid === this.id);
      console.log('resturant: ', this.data);
      let cart: any = await this.getCart();
      console.log('cart:', cart);
      if (cart?.value) {
        this.storedData = JSON.parse(cart.value);
        console.log('storedData:', this.storedData);
        if (
          this.id == this.storedData.resturant.uid &&
          this.allItems.length > 0
        ) {
          this.allItems.forEach((element: any) => {
            this.storedData.items.forEach((ele) => {
              if (element.id !== ele.id) return;
              element.quantity = ele.quantity;
            });
          });
        }
        this.cartData.totalItem = this.storedData.totalItem;
        this.cartData.totalPrice = this.storedData.totalPrice;
      }
      this.isLoading = false;
    }, 1000);
  }
  vegOnly(event) {
    console.log(event.detail.checked);
    this.items = [];
    if (event.detail.checked === true) {
      this.items = this.allItems.filter((x) => x.veg === true);
    } else {
      this.items = this.allItems;
    }
  }
  quantityPlus(index) {
    // console.log('added');
    try {
      console.log(this.items[index]);
      if (!this.items[index].quantity || this.items[index].quantity === 0) {
        this.items[index].quantity = 1;
        this.calculate();
      } else {
        this.items[index].quantity += 1;
        this.calculate();
      }
    } catch (e) {
      console.log(e);
    }
  }
  quantityMinus(index) {
    // console.log('minus');
    if (this.items[index].quantity !== 0) {
      this.items[index].quantity -= 1;
    } else {
      this.items[index].quantity = 0;
    }
    this.calculate();
  }
  calculate() {
    console.log(this.items);
    this.cartData.items = [];
    let item = this.items.filter((x) => x.quantity > 0);
    console.log('added item:', item);
    this.cartData.items = item;
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    // console.log(this.cartData);
    item.forEach((element) => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice +=
        parseFloat(element.price) * parseFloat(element.quantity);
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    if (this.cartData.totalItem == 0) {
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
    console.log('cart:', this.cartData);
  }

  saveToCart() {
    try {
      this.cartData.resturant = {};
      this.cartData.resturant = this.data;
      console.log('cartData:', this.cartData);
      Storage.set({
        key: 'cart',
        value: JSON.stringify(this.cartData),
      });
    } catch (error) {
      console.log(error);
    }
  }
  async viewCart() {
    if (this.cartData.items && this.cartData.items.length > 0) {
      await this.saveToCart();
      console.log('router url:', this.router.url);
      this.router.navigate([this.router.url + '/cart']);
    }
  }
}
