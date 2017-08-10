import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VariantsProvider } from '../../providers/variants/variants';

/**
 * Generated class for the UpdateVariantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-variant',
  templateUrl: 'update-variant.html',
})
export class UpdateVariantPage {

  variant: any;
  variantForm : FormGroup;
  formErrors = {
    'content': [],
    'size': [],
    'sugar': [],
    'saturated_fat': [],
    'trans_fatty_acid': [],
    'sodium': [],
  };
  validationMessages = {
    'content': {'required': 'Content is required.'},
    'size': {'required': 'Size is required.','pattern': 'Size must contain only valid values.'},
    'sugar': {'required': 'Sugar is required.','pattern': 'Sugar must contain only valid values.'},
    'saturated_fat': {'required': 'Saturated Fat is required.','pattern': 'Saturated Fat must contain only valid values.'},
    'trans_fatty_acid': {'required': 'Trans Fatty Acid  is required.','pattern': 'Trans Fatty Acid must contain only valid values.'},
    'sodium': {'required': 'Sodium is required.','pattern': 'Sodium must contain only valid values.'},
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public variantService: VariantsProvider, public formBuilder: FormBuilder, public toastCtrl: ToastController) {
    this.variant = this.navParams.get('variant');
    this.variantForm = formBuilder.group({
      _id: [this.variant._id],
      _rev: [this.variant._rev],
      product: [this.variant.product],
      type: ['variant'],
      content: [this.variant.content,Validators.compose([Validators.required])],
      size: [this.variant.size, Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      sugar: [this.variant.sugar, Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      saturated_fat: [this.variant.saturated_fat, Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      trans_fatty_acid: [this.variant.trans_fatty_acid, Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      sodium: [this.variant.sodium, Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      author: ['admin'],
      category: [this.variant.category],
      selling: [this.variant.selling],
      datePublished: [this.variant.datePublished],
      dateUpdated: [this.variant.dateUpdated]
    });
    this.variantForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.variantForm) { return; }
    const form = this.variantForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.variantForm[field] = '';
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
    if(this.variantForm.valid){
      this.variantForm.value.dateUpdated = new Date().toISOString();
      this.variantService.addVariant(this.variantForm.value);
      this.navCtrl.pop();
      let toast = this.toastCtrl.create({
        message: 'Variant successfully updated',
        position: 'bottom',
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'X'
      });
      toast.present();
    }
  }

}
