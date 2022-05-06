import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsPageRoutingModule } from './items-routing.module';

import { ItemsPage } from './items.page';
import { ItemComponent } from 'src/app/components/item/item.component';
import { ResturantDetailComponent } from 'src/app/components/resturant-detail/resturant-detail.component';
import { EmptyScreenComponent } from 'src/app/components/empty-screen/empty-screen.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsPageRoutingModule
  ],
  declarations: [ItemsPage,ItemComponent,ResturantDetailComponent,EmptyScreenComponent]
})
export class ItemsPageModule {}
