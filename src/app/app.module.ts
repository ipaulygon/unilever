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
import { CalculatorPage } from '../pages/calculator/calculator';
import { AddIngredientPage } from '../pages/add-ingredient/add-ingredient';
import { ViewIngredientPage } from '../pages/view-ingredient/view-ingredient';
import { UpdateIngredientPage } from '../pages/update-ingredient/update-ingredient';
import { AddRecipePage } from '../pages/add-recipe/add-recipe';
import { ViewRecipePage } from '../pages/view-recipe/view-recipe';
import { UpdateRecipePage } from '../pages/update-recipe/update-recipe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { ProductsProvider } from '../providers/products/products';
import { VariantsProvider } from '../providers/variants/variants';
import { IngredientsProvider } from '../providers/ingredients/ingredients';
import { RecipeProvider } from '../providers/recipe/recipe';

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
    CalculatorPage,
    AddIngredientPage,
    ViewIngredientPage,
    UpdateIngredientPage,
    AddRecipePage,
    ViewRecipePage,
    UpdateRecipePage,
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
    CalculatorPage,
    AddIngredientPage,
    ViewIngredientPage,
    UpdateIngredientPage,
    AddRecipePage,
    ViewRecipePage,
    UpdateRecipePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    ProductsProvider,
    VariantsProvider,
    IngredientsProvider,
    RecipeProvider
  ]
})
export class AppModule {}
