import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {CommonService} from "../core/services/common.service";
import {APIUrlConstants} from "../shared/constants/APIUrlConstants";

@Injectable({
    providedIn: "root"
})
export class ProductService extends CommonService{
    private readonly MODEL_NAME = 'product';
    private readonly PRODUCTS_ENDPOINT = APIUrlConstants.PRODUCTS;

    constructor() {
        super();
        super.setApiEndpoint(this.PRODUCTS_ENDPOINT);
        super.setModelName(this.MODEL_NAME);
    }

    public getProducts(): Observable<any> {
        return this.simplePost(this.PRODUCTS_ENDPOINT, null, this.MODEL_NAME);
    }
}
