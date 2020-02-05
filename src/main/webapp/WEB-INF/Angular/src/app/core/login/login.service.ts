import {Injectable} from '@angular/core';
import {GlobalData} from "../services/global-data";
import {UserSessionService} from "../services/user-session.service";
import {LogoutService} from "../services/logout.service";
import {UserTypeService} from "../services/user-type.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {APIUrlConstants} from "../../shared/constants/APIUrlConstants";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {LoadingIndicatorService} from "../loading-indicator/loading-indicator.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public userSession: Promise<any>;

    constructor(private readonly globalData: GlobalData,
                private readonly userService: UserSessionService,
                private readonly userTypeService: UserTypeService,
                private readonly http: HttpClient,
                private readonly cookieService: CookieService,
                private readonly loadingIndicatorService: LoadingIndicatorService) {
    }

    public loginUser(user: { email: string, password: string }): Observable<any> {
        this.loadingIndicatorService.startLoading();
        // get jwt token
        let headers =
            {
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Basic ' + btoa('Fulei:fulei-secret')
            };
        // let options = { headers: headers };

        const body = new HttpParams()
            .set('username', user.email)
            .set('password', user.password)
            .set('grant_type', 'password');

        return this.http.post(APIUrlConstants.OAUTH_TOKEN, body, {headers});
    }
}
