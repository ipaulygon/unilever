import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewIngredientPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-ingredient',
  templateUrl: 'view-ingredient.html',
})
export class ViewIngredientPage {

  ingredient: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ingredient = this.navParams.get('ingredient');
  }
}
