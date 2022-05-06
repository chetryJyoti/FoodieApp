import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResturantComponent } from './resturant/resturant.component';
import { IonicModule } from '@ionic/angular';
import { ResturantLoaderComponent } from './resturant-loader/resturant-loader.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';

@NgModule({
  declarations: [
    ResturantComponent,
    ResturantLoaderComponent,
    EmptyScreenComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [ResturantComponent,ResturantLoaderComponent,EmptyScreenComponent],
})
export class ComponentsModule {}
