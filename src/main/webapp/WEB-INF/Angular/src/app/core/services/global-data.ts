import {Injectable} from '@angular/core';
import {User} from "../../shared/model/user";
import {Observable, Subject} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class GlobalData {
    private totalNumberOfProducts = new Subject<number>();
    private loginStatus = new Subject<boolean>();
    private userSession: any = null;
    cacheMap: Map<string, any> = new Map<string, any>();

    public setTotalNumberOfProducts(totalNumber: number) {
        this.totalNumberOfProducts.next(totalNumber);
    }

    public getTotalNumberOfProducts(): Observable<number> {
        return this.totalNumberOfProducts;
    }

    public setLoginStatus(status: boolean) {
        this.loginStatus.next(status);
    }

    public getLoginStatus(): Observable<boolean> {
        return this.loginStatus;
    }

    public getUser() {
        return this.userSession;
    }

    public setUserSession(userSession) {
        this.userSession = userSession;
    }
}
