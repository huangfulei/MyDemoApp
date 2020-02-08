import {Injectable} from '@angular/core';
import {APIUrlConstants} from "../shared/constants/APIUrlConstants";
import {CommonService} from "../core/services/common.service";
import {Product} from "../product/product";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService extends CommonService {

    private readonly cartModel = 'product';
    private readonly CART_ENDPOINT = APIUrlConstants.CART;

    constructor() {
        super();
        super.setApiEndpoint(this.CART_ENDPOINT);
        super.setModelName(this.cartModel);
    }

    public addItemToCart(product: Product): Observable<any> {
        const postModel = {};
        postModel[this.cartModel] = product;
        return this.http.post(this.CART_ENDPOINT + 'addProductToCart', postModel);
    }
}
