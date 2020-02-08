import {Injectable} from '@angular/core';
import {APIUrlConstants} from "../shared/constants/APIUrlConstants";
import {CommonService} from "../core/services/common.service";
import {Product} from "../product/product";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService extends CommonService {

    private readonly MODEL_NAME = 'product';
    private readonly CART_ENDPOINT = APIUrlConstants.CART;
    private readonly ADD_TO_CART_ENDPOINT = this.CART_ENDPOINT + APIUrlConstants.ADD_TO_CART;

    constructor() {
        super();
        super.setApiEndpoint(this.CART_ENDPOINT);
        super.setModelName(this.MODEL_NAME);
    }

    public addItemToCart(product: Product): Observable<any> {
        return this.simplePost(this.MODEL_NAME, product, this.ADD_TO_CART_ENDPOINT);
    }
}
