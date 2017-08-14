import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientsProvider } from '../../providers/ingredients/ingredients';

/**
 * Generated class for the AddIngredientPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-ingredient',
  templateUrl: 'add-ingredient.html',
})
export class AddIngredientPage {

  ingredientForm : FormGroup;
  formErrors = {
    'group': [],
    'ingredient': [],
    'water': [],
    'energy': [],
    'protein': [],
    'safa': [],
    'carb': [],
    'sugar': [],
    'sodium': [],
    'potassium': [],
    'calcium': [],
    'vaiu': [],
    'vdiu': [],
    'vc': []
  };
  validationMessages = {
    'group': {'required': 'Group is required.'},
    'ingredient': {'required': 'Ingredient is required.'},
    'water': {'required': 'Ingredient is required.','pattern': 'Invalid input'},
    'energy': {'required': 'Energy is required.','pattern': 'Invalid input'},
    'protein': {'required': 'Protein is required.','pattern': 'Invalid input'},
    'safa': {'required': 'Saturated Fat is required.','pattern': 'Invalid input'},
    'carb': {'required': 'Carbohydrate is required.','pattern': 'Invalid input'},
    'sugar': {'required': 'Sugar is required.','pattern': 'Invalid input'},
    'sodium': {'required': 'Sodium is required.','pattern': 'Invalid input'},
    'potassium': {'required': 'Potassium is required.','pattern': 'Invalid input'},
    'calcium': {'required': 'Calcium is required.','pattern': 'Invalid input'},
    'vaiu': {'required': 'Vitamin A, IU is required.','pattern': 'Invalid input'},
    'vdiu': {'required': 'Vitamin D, IU is required.','pattern': 'Invalid input'},
    'vc': {'required': 'Vitamin C is required.','pattern': 'Invalid input'}
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public ingredientService: IngredientsProvider, public formBuilder: FormBuilder, public toastCtrl: ToastController) {
    this.ingredientForm = formBuilder.group({
      _id: [null],
      type: ['ingredient'],
      group: ['',Validators.compose([Validators.required])],
      ingredient: ['',Validators.compose([Validators.required])],
      water: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      energy: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      protein: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      safa: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      carb: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      sugar: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      sodium: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      potassium: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      calcium: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      vaiu: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      vdiu: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      vc: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
      ])],
      author: ['admin'],
      datePublished: [''],
      dateUpdated: ['']
    });
    this.ingredientForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.ingredientForm) { return; }
    const form = this.ingredientForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.ingredientForm[field] = '';
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
    if(this.ingredientForm.valid){
      this.ingredientForm.value.datePublished = new Date().toISOString();
      this.ingredientForm.value.dateUpdated = new Date().toISOString();
      this.ingredientService.addIngredient(this.ingredientForm.value);
      let toast = this.toastCtrl.create({
        message: 'Ingredient successfully added',
        position: 'bottom',
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'X'
      });
      toast.present();
      this.navCtrl.pop();
    }
  }

}
