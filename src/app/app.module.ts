import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddProductPage } from '../pages/add-product/add-product';
import { ViewProductPage } from '../pages/view-product/view-product';
import { UpdateProductPage } from '../pages/update-product/update-product';
import { AddVariantPage } from '../pages/add-variant/add-variant';
import { ViewVariantPage } from '../pages/view-variant/view-variant';
import { UpdateVariantPage } from '../pages/update-variant/update-variant';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { ProductsProvider } from '../providers/products/products';
import { VariantsProvider } from '../providers/variants/variants';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddProductPage,
    ViewProductPage,
    UpdateProductPage,
    AddVariantPage,
    ViewVariantPage,
    UpdateVariantPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddProductPage,
    ViewProductPage,
    UpdateProductPage,
    AddVariantPage,
    ViewVariantPage,
    UpdateVariantPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    ProductsProvider,
    VariantsProvider
  ]
})
export class AppModule {}
