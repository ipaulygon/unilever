import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { AddProductPage } from '../add-product/add-product';
import { ViewProductPage } from '../view-product/view-product';
import { UpdateProductPage } from '../update-product/update-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any;
  items: any;

  constructor(public navCtrl: NavController, public productsService: ProductsProvider, public alertCtrl: AlertController) {
    this.init();
  }

  init(){
    this.productsService.getProducts().subscribe((products) => {
        this.products = products;
        this.items = products;
    });
  }

  initProducts(){
    this.items = this.products;
  }

  pushAddProductPage(){
    this.navCtrl.push(AddProductPage);
  }

  viewProduct(product){
    this.navCtrl.push(ViewProductPage, {
        product: product
    });
  }

  updateProduct(product){
    this.navCtrl.push(UpdateProductPage, {
        product: product
    });
  }

  deleteProduct(product){
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
            this.productsService.deleteProduct(product);
            this.init();
          }
        }
      ]
    });
    alert.present();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initProducts();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.product.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
