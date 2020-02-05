import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../../shared/model/user";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public currentUser: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;
    private signUpUserUrl = '/signup';
    private readonly JWT_TOKEN = 'JWT_TOKEN';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /*    public get currentUserValue(): User {
            return this.currentUserSubject.value;
        }*/

    /*
        public login(user: { email: string, password: string }): Observable<boolean> {
            return this.http.post<any>('login', user)
                .pipe(
                    tap((response: LoginData) => {
                        console.log(response);
                        this.doLoginUser(response.user, response.token);
                    }),
                    mapTo(true),
                    catchError(err => {
                        console.log(err.error);
                        return of(false);
                    }))
        }
    */

    public logout() {
        // remove user from local storage to log user out

        this.currentUserSubject.next(null);
    }

    public signUpUser(userInfo: User) {
        return this.http.post<User>(this.signUpUserUrl, userInfo, httpOptions);
    }

    /*
                .subscribe(
                (data: Oauth2Response) => {
                    console.log(data);
                    this.cookieService.set(SharedConstants.JWT_TOKEN, data.access_token);
                    this.cookieService.set(SharedConstants.JWT_REFRESH_TOKEN, data.access_token);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                });
    */


    /*    private doLoginUser(user: User, token: string) {
            this.currentUserSubject.next(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.storeTokens(token);
        }*/

    /*    private doLogoutUser() {
            this.currentUserSubject.next(null);
            this.removeTokens();
        }*/

    /*    public getJwtToken() {
            return localStorage.getItem(this.JWT_TOKEN);
        }*/

    /*    private storeTokens(token: string) {
            localStorage.removeItem(this.JWT_TOKEN);
            localStorage.setItem(this.JWT_TOKEN, token);
        }*/

    /*    private removeTokens() {
            localStorage.removeItem(this.JWT_TOKEN);
        }

        public getLoggedUsers(): Observable<any> {
            return this.http.get<any>('/loggedUsers');
        }*/
}
