import { Product } from '../index';
import { Http, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable() 

export class ProductService {

    products: Product[] = [];

    constructor(private _http: Http){}

    addMessage(product: Product) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            formData.append('description', product.desc);
            formData.append('price', product.price);
            formData.append('stock', product.stock);
            for (var i = 0; i < product.image.length; i++) {
                formData.append('image[]', product.image[i], product.image[i].name);
            }
            for (var i = 0; i < product.categoryId.length; i++) {
                formData.append('categoryId[]', product.categoryId[i]);
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST','http://localhost:3000/product', true);
            xhr.send(formData);

        });
    }

    getMessage() {
        return this._http.get('http://localhost:3000/product')
            .map(response => {
                const data = response.json().obj;
                let objs: any[] = [];
                for (let i = 0; i < data.length; i++) {
                    let product = new Product(data[i].image, data[i].desc, data[i].price, data[i].stock, data[i].category);
                    objs.push(product);
                }
                
                return objs;
            })
            .catch(error => Observable.throw(error.json()));
    }
}