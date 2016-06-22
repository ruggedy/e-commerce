import { Component, OnInit } from '@angular/core';
import { Product, Category, ProductService, CategoryService } from '../shared/index';
@Component({
    moduleId: module.id,
    selector: 'sd-products',
    templateUrl: 'products.component.html',
    styleUrls: ['products.component.css']
})
export class ProductsComponent implements OnInit {
    constructor(private _categoryService: CategoryService, private _productService: ProductService) { }

    products: Product[];
    categories: Category[];
    selectedImage: string = null;

    ngOnInit() {
        this._productService.getMessage()
            .subscribe(
                products => {
                    console.log(products);
                    this.products = products;
                    this._productService.products = products;                
                },
                error => console.log(error)
            )
        this._categoryService.getCategory()
            .subscribe(
                categories => {
                    this.categories = categories;
                    this._categoryService.categories = categories;
                },
                error => console.log(error)
            )
     }

}