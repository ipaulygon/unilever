import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsProvider } from '../../providers/products/products';
/**
 * Generated class for the UpdateProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-product',
  templateUrl: 'update-product.html',
})
export class UpdateProductPage {

  product: any;
  productForm : FormGroup;
  formErrors = {
    'brand': [],
    'product': [],
  };
  validationMessages = {
    'brand': {'required': 'Brand is required.'},
    'product': {'required': 'Product is required.'}
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductsProvider, public formBuilder: FormBuilder, public toastCtrl: ToastController) {
    this.product = this.navParams.get('product');
    this.productForm = formBuilder.group({
      _id: [this.product._id],
      _rev: [this.product._rev],
      type: ['product'],
      brand: [this.product.brand,Validators.compose([Validators.required])],
      product: [this.product.product,Validators.compose([Validators.required])],
      author: ['admin'],
      datePublished: [this.product.datePublished],
      dateUpdated: [this.product.dateUpdated]
    });
    this.productForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.productForm) { return; }
    const form = this.productForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.productForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  save(){
    // Generate computed fields
    if(this.productForm.valid){
      this.productForm.value._id = this.productForm.value.product.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
      this.productForm.value.dateUpdated = new Date().toISOString();
      this.productService.addProduct(this.productForm.value);
      this.navCtrl.pop();
      let toast = this.toastCtrl.create({
        message: 'Product successfully updated',
        position: 'bottom',
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'X'
      });
      toast.present();
    }
  }
  
}
