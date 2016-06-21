import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup } from '@angular/forms'
import { ProductService,CategoryService, Product, Category } from '../../shared/index';
import { FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload'

const URL = 'http://localhost:3000/image';
@Component({
    moduleId: module.id,
    selector: 'sd-product',
    templateUrl: 'product.component.html',
    styleUrls:['product.component.css'],
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class ProductComponent implements OnInit {
    product: Product = null;
    category: Category = null;
    products: Product[];
    categories: Category[];
    checked: string[] = [];
    filesToUpload: File[] = [];
    
    myProductForm = new FormGroup({
        name: new FormGroup({image: new FormControl(),
                            desc: new FormControl(),
                            price: new FormControl(),
                            stock: new FormControl()})
    });

    constructor(private _productService: ProductService, private _categoryService: CategoryService) { }

   onSubmit(form: any) {
        this.product = new Product(this.filesToUpload, form.name.desc, form.name.price, form.name.stock, this.checked);
        this._productService.addMessage(this.product).then((result)=>
        console.log(result), (error)=> console.log(error));
    }

    fileChangeEvent(event:any){
        this.filesToUpload = event.target.files;
    }
   
    updateChecked(category:Category, event:any){
        
        let index = this.checked.indexOf(category.categoryId);

        if (event.target.checked) {
            if (index === -1) {
                this.checked.push(category.categoryId);
            }
        } else {
            if (index !== -1) {
                this.checked.splice(index, 1)
            }
        }
    }

    onCatSubmit(form: any) {
        console.log(form);
        this.category = new Category(form.name);
        this._categoryService.addCategory(this.category)
                .subscribe(
                    data => {
                        console.log(data);
                    },
                    error => console.log(error)
                )
    }

        
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
