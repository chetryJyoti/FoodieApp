import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  urlCheck: any;
  url: any;
  model: any={};
  deliveryCharge=20;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUrl();
    this.getCartData();
  }
  getCart() {
    return Storage.get({ key: 'cart' });
  }
 async getCartData(){
    let data: any = await this.getCart();
    if(data?.value){
      this.model =await JSON.parse(data.value);
      console.log(this.model);
      this.calculate();
    }
  }

async calculate(){
    let item =this.model.items.filter(x=>x.quantity >0);
    this.model.items=item;
    this.model.totalPrice=0;
    this.model.totalItem=0;
    this.model.deliveryCharge=0;
    this.model.grandTotal=0;
    await this.clearCart();
    item.forEach((element) => {
      this.model.totalItem += element.quantity;
      this.model.totalPrice +=
        parseFloat(element.price) * parseFloat(element.quantity);
    });
    this.model.deliveryCharge=this.deliveryCharge;
    this.model.totalPrice = parseFloat(this.model.totalPrice).toFixed(2);
    if (this.model.totalItem == 0) {
      this.model.totalItem = 0;
      this.model.totalPrice = 0;
    }
    console.log('cart:', this.model);
  }
  clearCart() {
   return Storage.remove({key:'cart'});
  }
  checkUrl(){
    const url: any = this.router.url.split('/');
    // console.log('url: ', url);
    //  url:  (3) ['', 'tabs', 'cart']
    // console.log(url.length);
    // 3
    const spliced = url.splice(url.length - 2, 2);
    // console.log('spliced:', spliced);
     //   spliced: (2) ['tabs', 'cart']
    this.urlCheck = spliced[0];
    // console.log('urlCheck:', this.urlCheck);
    //   urlCheck: tabs
    url.push(this.urlCheck);
    this.url=url;
    console.log(this.url);
    // (2) ['', 'tabs']
  }
  getPreviousUrl(){
    return this.url.join('/');
  }

}
