import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ProductService {
    private MODEL_NAME = 'product';
    private productSubject = new BehaviorSubject<any>({});
    private getProductUrl = 'products';
    public updatedProduct = this.productSubject.asObservable();

    constructor(private readonly http: HttpClient,) {
    }

    public getProducts(): Observable<any> {
        return this.http.get(this.getProductUrl)
    }
}
