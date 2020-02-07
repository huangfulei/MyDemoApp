import {Component, OnInit} from '@angular/core';
import {Product} from "../product/product";
import {CartService} from "./cart.service";
import {BaseModel} from "../shared/model/base-model";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public products: Product[];

    constructor(private readonly cartService: CartService) {
    }

    ngOnInit() {
        this.loadCartData();
    }

    private loadCartData() {
        this.cartService.search().subscribe((response: BaseModel) => {
            console.log(response);
            this.products = response.resultList;
        })
    }
}
