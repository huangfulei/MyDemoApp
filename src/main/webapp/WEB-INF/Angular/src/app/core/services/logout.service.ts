import {Injectable} from '@angular/core';
import {APIUrlConstants} from "../../shared/constants/APIUrlConstants";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {UserSessionService} from "./user-session.service";

@Injectable({
    providedIn: 'root'
})
export class LogoutService {

    constructor(private readonly http: HttpClient,
                private readonly cookieService: CookieService,
                private readonly usersessionService: UserSessionService,
                private readonly route: Router) {
    }

    public sendUserToLogout(): void {
        this.cookieService.deleteAll();
        this.usersessionService.setLoginStatus(false);
        this.route.navigate(['/login']);
        // window.location.href = APIUrlConstants.LOGOUT_URL;
    }

    public sendUserToNoAccess(): void {
        window.location.href = APIUrlConstants.NO_ACCESS_URL;
    }
}
