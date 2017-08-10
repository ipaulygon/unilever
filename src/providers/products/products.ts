import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import 'rxjs/add/observable/from';
import { DataProvider } from '../data/data';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  products: any;
  productSubject: any = new Subject();

  constructor(public http: Http,public dataService: DataProvider, public zone: NgZone) {
    this.dataService.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        if(change.doc.type === 'product'){
            this.changeProduct(change);
        }
    });
  }

  getProducts(){
    this.emitproducts();
    return this.productSubject;
  }

  addProduct(product): void {
      this.dataService.db.put(product);
  }
 
  emitproducts(): void {
    this.zone.run(() => {
        this.dataService.db.query('products/by_name').then((data) => {
            let products = data.rows.map(row => {
                return row.value;
            });
            this.products = products;
            this.productSubject.next(products);
        });
    });
  }

  changeProduct(change): void {
    let changedDoc = null;
    let changedIndex = null;
    // Find the affected document (if any)
    this.products.forEach((doc, index) => {
        if(doc._id === change.id){
            changedDoc = doc;
            changedIndex = index;
        }
    });
    //A document was deleted - remove it
    if(change.deleted){
        this.products.splice(changedIndex, 1);
    } else {
        //A document was updated - change it
        if(changedDoc){
            this.products[changedIndex] = change.doc;
        } 
        //A document was added - add it
        else {
            this.products.push(change.doc); 
        }
    }
    this.productSubject.next(this.products);
  }
}
