import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import { DataProvider } from '../data/data';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the IngredientsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IngredientsProvider {

  ingredients: any;
  ingredientSubject: any = new Subject();

  constructor(public http: Http,public dataService: DataProvider, public zone: NgZone) {
    this.dataService.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        if(change.doc.type === 'ingredient'){
            this.changeIngredient(change);
        }
    });
  }

  getIngredients(){
    this.emitingredients();
    return this.ingredientSubject;
  }

  addIngredient(ingredient): void {
      this.dataService.db.post(ingredient);
  }

  deleteIngredient(ingredient): void{
      this.dataService.db.remove(ingredient);
  }
 
  emitingredients(): void {
    this.zone.run(() => {
        this.dataService.db.query('ingredients/by_name').then((data) => {
            let ingredients = data.rows.map(row => {
                return row.value;
            });
            this.ingredients = ingredients;
            this.ingredientSubject.next(ingredients);
        });
    });
  }

  changeIngredient(change): void {
    let changedDoc = null;
    let changedIndex = null;
    // Find the affected document (if any)
    this.ingredients.forEach((doc, index) => {
        if(doc._id === change.id){
            changedDoc = doc;
            changedIndex = index;
        }
    });
    //A document was deleted - remove it
    if(change.deleted){
        this.ingredients.splice(changedIndex, 1);
    } else {
        //A document was updated - change it
        if(changedDoc){
            this.ingredients[changedIndex] = change.doc;
        } 
        //A document was added - add it
        else {
            this.ingredients.push(change.doc); 
        }
    }
    this.ingredientSubject.next(this.ingredients);
  }

}
