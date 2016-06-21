export class Product {
    constructor(public image: File[], public desc: string, public price: number, public stock: number, public categoryId?: string[]){}
}