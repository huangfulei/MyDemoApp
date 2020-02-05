import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "./product";

@Injectable({
    providedIn: "root"
})
export class ProductService {

    private productSubject = new BehaviorSubject<any>({});
    private getProductUrl = '/products';
    public updatedProduct = this.productSubject.asObservable();

    constructor(private readonly http: HttpClient,) {
    }

    public getProducts(): Observable<any> {
        return this.http.get(this.getProductUrl)
    }

    public addItemToCart(product: Product) {
        this.http.post('addProductToCart', product).subscribe((response) => {
            console.log(response);
            this.productSubject.next(response);
        })
    }
}
