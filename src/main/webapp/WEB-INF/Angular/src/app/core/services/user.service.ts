import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../../shared/model/user";
import {APIUrlConstants} from "../../shared/constants/APIUrlConstants";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public currentUser: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;
    private readonly SIGN_UP_ENDPOINT = APIUrlConstants.SIGN_UP;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public logout() {
        // remove user from local storage to log user out

        this.currentUserSubject.next(null);
    }

    public signUpUser(userInfo: any): Observable<any> {
        console.log(userInfo);
        return this.http.post(this.SIGN_UP_ENDPOINT, userInfo);
    }

}
