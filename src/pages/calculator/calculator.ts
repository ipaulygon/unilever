import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { IngredientsProvider } from '../../providers/ingredients/ingredients';
import { RecipeProvider } from '../../providers/recipe/recipe';
import { AddIngredientPage } from '../add-ingredient/add-ingredient';
import { ViewIngredientPage } from '../view-ingredient/view-ingredient';
import { UpdateIngredientPage } from '../update-ingredient/update-ingredient';
import { AddRecipePage } from '../add-recipe/add-recipe';
import { ViewRecipePage } from '../view-recipe/view-recipe';
import { UpdateRecipePage } from '../update-recipe/update-recipe';

/**
 * Generated class for the CalculatorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {

  ingredients: any;
  ingItems: any;
  recipes: any;
  recItems: any;
  food: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ingredientsService: IngredientsProvider, public recipesService: RecipeProvider, public alertCtrl: AlertController) {
    this.food = "ingredients";
    this.init();
  }

  doRefresh(refresher) {
    this.init();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  init(){
    this.ingredientsService.getIngredients().subscribe((ingredients) => {
        this.ingredients = ingredients;
        this.ingItems = ingredients;
    });
    this.recipesService.getRecipes().subscribe((recipes) => {
        this.recipes = recipes;
        this.recItems = recipes;
    });
  }

  initIngredients(){
    this.ingItems = this.ingredients;
  }

  initRecipes(){
    this.recItems = this.recipes;
  }

  // ingredients
  pushAddIngredientPage(){
    this.navCtrl.push(AddIngredientPage);
  }

  viewIngredient(ingredient){
    this.navCtrl.push(ViewIngredientPage, {
        ingredient: ingredient
    });
  }

  updateIngredient(ingredient){
    this.navCtrl.push(UpdateIngredientPage, {
        ingredient: ingredient
    });
  }

  deleteIngredient(ingredient){
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
            this.ingredientsService.deleteIngredient(ingredient);
            this.init();
          }
        }
      ]
    });
    alert.present();
  }

  getIngredients(ev: any) {
    // Reset items back to all of the items
    this.initIngredients();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.ingItems = this.ingItems.filter((item) => {
        return (item.ingredient.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  //recipe
  pushAddRecipePage(){
    this.navCtrl.push(AddRecipePage);
  }

  viewRecipe(recipe){
    this.navCtrl.push(ViewRecipePage, {
        recipe: recipe
    });
  }

  updateRecipe(recipe){
    this.navCtrl.push(UpdateRecipePage, {
        recipe: recipe
    });
  }

  deleteRecipe(recipe){
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
            this.ingredientsService.deleteIngredient(recipe);
            this.init();
          }
        }
      ]
    });
    alert.present();
  }

  getRecipes(ev: any) {
    // Reset items back to all of the items
    this.initRecipes();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.recItems = this.recItems.filter((item) => {
        return (item.ingredient.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
