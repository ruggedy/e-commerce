import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Product } from '../../shared/index'; 
@Component({
    moduleId: module.id,
    selector: 'sd-product',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.css']
})
export class ProductComponent implements OnInit {
    constructor(private _route: ActivatedRoute, private _Router: Router) { }

    ngOnInit() { }

}