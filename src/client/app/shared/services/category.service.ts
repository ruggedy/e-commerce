import { Category } from '../index';
import { Http, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable() 

export class CategoryService {

    categories: Category[] = [];

    constructor(private _http: Http){}

    addCategory(category: Category) {
        const body = JSON.stringify(category);
        const header = new Headers({'Content-Type': 'application/json'});

        return this._http.post('http://localhost:3000/category', body, {headers: header})
            .map(response => {
                const data = response.json().obj;
                let category = new Category(data.title, data._id);
                return category;
            })
            .catch(error => Observable.throw(error.json()))
    }

    getCategory() {
        return this._http.get('http://localhost:3000/category')
            .map(response => {
                const data = response.json().obj;
                let objs: any[] = [];
                for (let i = 0; i < data.length; i++) {
                    let category = new Category(data[i].title, data[i]._id);
                    objs.push(category)
                }
                return objs;
            })
            .catch(error => Observable.throw(error.json()))
    }
}