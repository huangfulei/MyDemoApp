import {Component, OnInit} from '@angular/core';
import {CartService} from "./cart.service";
import {BaseModel} from "../shared/model/base-model";
import {Cart} from "./cart";
import {GlobalData} from "../core/services/global-data";
import {CookieService} from "ngx-cookie-service";
import {SharedConstants} from "../shared/constants/SharedConstants";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    displayedColumns: string[] = ['Name', 'Description', 'Price'];
    public products: Cart[];
    public totalNumberOfProducts;

    // dataSource = ELEMENT_DATA;

    constructor(private readonly cartService: CartService,
                private readonly cookieService: CookieService) {
    }

    ngOnInit() {
        this.loadCartData();
        this.totalNumberOfProducts = +this.cookieService.get(SharedConstants.TOTAL_NUMBER_OF_PRODUCTS)

    }

    private loadCartData() {
        this.cartService.search().subscribe((response: BaseModel) => {
            console.log(response);
            this.products = response.resultList;
        })
    }
}
