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

    displayedColumns: string[] = ['Name', 'Description', 'Price'];
    public dataSource: Product[];
    // dataSource = ELEMENT_DATA;

    constructor(private readonly cartService: CartService) {
    }

    ngOnInit() {
        this.loadCartData();
    }

    private loadCartData() {
        this.cartService.search().subscribe((response: BaseModel) => {
            console.log(response);
            this.dataSource = response.resultList;
        })
    }
}
