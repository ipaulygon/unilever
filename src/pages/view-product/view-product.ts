import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { VariantsProvider } from '../../providers/variants/variants';
import { AddVariantPage } from '../add-variant/add-variant';
import { ViewVariantPage } from '../view-variant/view-variant';
import { UpdateVariantPage } from '../update-variant/update-variant';

/**
 * Generated class for the ViewProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.html',
})
export class ViewProductPage {

  product: any;
  variants: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public variantService: VariantsProvider, public alertCtrl: AlertController ) {
    this.product = this.navParams.get('product');
    this.init();
  }

  ionViewDidLoad() {
    this.init();
  }

  init(){
    this.variantService.getVariants(this.product._id).subscribe((variants) => {
        this.variants = variants;
    });
  }

  pushAddVariantPage(){
    this.navCtrl.push(AddVariantPage, {
        product: this.product
    });
  }

  viewVariant(variant){
    this.navCtrl.push(ViewVariantPage, {
        product: this.product,
        variant: variant
    });
  }
  
  updateVariant(variant){
    this.navCtrl.push(UpdateVariantPage, {
        variant: variant
    });
  }

  deleteVariant(variant){
    let alert = this.alertCtrl.create({
      title: 'Warning!',
      message: 'Are you sure you want to delete this data?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          handler: data => {
            this.variantService.deleteVariant(variant);
            this.init();
          }
        }
      ]
    });
    alert.present();
  }

}
