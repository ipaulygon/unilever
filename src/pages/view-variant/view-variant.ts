import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewVariantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-variant',
  templateUrl: 'view-variant.html',
})
export class ViewVariantPage {

  product: any;
  variant: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product');
    this.variant = this.navParams.get('variant');
  }

  

}
