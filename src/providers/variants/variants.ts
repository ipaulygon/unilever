import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DataProvider } from '../data/data';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the VariantsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VariantsProvider {

  variants: any = [];
  variantSubject: any = new Subject(); 

  constructor(public http: Http,public dataService: DataProvider, public zone: NgZone) {
    this.dataService.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        if(change.doc.type === 'variant' && this.variants.length > 0){
            if(change.doc.product === this.variants[0].product){
                this.changeVariant(change);
            }
        }
    });
  }

  getVariants(productId){
    this.emitVariants(productId);
    return this.variantSubject;
  }
 
  addVariant(variant): void {
    this.dataService.db.post(variant);
  }
 
  emitVariants(productId): void {
    this.zone.run(() => {
        this.dataService.db.query('variants/by_product_id', {key: productId}).then((data) => {
            let variants = data.rows.map(row => {
                return row.value;
            });
            this.variants = variants;
            this.variantSubject.next(this.variants);
        });
    });
  }
 
  changeVariant(change): void {
    let changedDoc = null;
    let changedIndex = null;
    // Find the affected document (if any)
    this.variants.forEach((doc, index) => {
        if(doc._id === change.id){
            changedDoc = doc;
            changedIndex = index;
        }
    });
    //A document was deleted - remove it
    if(change.deleted){
        this.variants.splice(changedIndex, 1);
    } else {
        //A document was updated - change it
        if(changedDoc){
            this.variants[changedIndex] = change.doc;
        } 
        //A document was added - add it
        else {
            this.variants.push(change.doc); 
        }
    }
  }
}
