import {Injectable} from '@angular/core';
import {UserSessionService} from "../services/user-session.service";
import {UserTypeService} from "../services/user-type.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {APIUrlConstants} from "../../shared/constants/APIUrlConstants";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public userSession: Promise<any>;
    private readonly OAUTH_TOKEN_ENDPOINT = APIUrlConstants.OAUTH_TOKEN;

    constructor(private readonly http: HttpClient) {}

    public loginUser(user: { user: { email: string, password: string } }): Observable<any> {
        // get jwt token
        let headers =
            {
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Basic ' + btoa('Fulei:fulei-secret')
            };
        // let options = { headers: headers };

        const body = new HttpParams()
            .set('username', user.user.email)
            .set('password', user.user.password)
            .set('grant_type', 'password');

        return this.http.post(this.OAUTH_TOKEN_ENDPOINT, body, {headers});
    }
}
