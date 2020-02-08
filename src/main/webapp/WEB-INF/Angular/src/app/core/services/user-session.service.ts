import {Injectable} from '@angular/core';
import {isNotEmptyArray, isNotNull, isNull} from "../../shared/utility/common.utility";
import {SharedConstants} from "../../shared/constants/SharedConstants";
import {Permission} from "../../shared/model/permission";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {APIUrlConstants} from "../../shared/constants/APIUrlConstants";
import {CookieService} from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class UserSessionService {
    private readonly LOG_IN_ENDPOINT = APIUrlConstants.LOG_IN;
    private readonly OAUTH_TOKEN_ENDPOINT = APIUrlConstants.OAUTH_TOKEN;
    private userSession: any = null;
    private loginStatus = new Subject<boolean>();

    constructor(private readonly http: HttpClient,
                private readonly cookieService: CookieService) {
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

    public getUserSession(user: { user:{email: string, password: string} }): Promise<any> {
        // Fetch User session from the common controller
        return this.http.post(this.LOG_IN_ENDPOINT, user).toPromise();
    }

    public getPermissionByBusinessObject(businessObjectName: string): Permission | undefined {
        const permissionList: any = this.getUserPermissionList();
        let foundPermission: Permission = new Permission(); // All permissions will default to false.
        if (isNotEmptyArray(permissionList)) {
            for (const permission of permissionList) {
                if (permission.businessObject.name === businessObjectName) {
                    foundPermission = permission;
                    foundPermission.businessObject.id = permission.businessObject.id;
                    foundPermission.businessObject.name = permission.businessObject.name;
                    break;
                }
            }
        }

        if (isNull(foundPermission)) {
            console.log('No Permission found for Business Object:', businessObjectName);
        }
        return foundPermission;
    }

    private getUserPermissionList(): Observable<any> {
        if (isNotNull(this.userSession)) {
            return this.userSession.permissionList;
        }
    }

    public setUserSession(userSession) {
        this.userSession = userSession;
    }

    public logout() {

    }

    public refreshToken(): Observable<any> {
        let headers =
            {
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Basic ' + btoa('Fulei:fulei-secret')
            };

        const body = new HttpParams()
            .set('client_id', 'Fulei')
            .set('grant_type', 'refresh_token')
            .set('refresh_token', this.cookieService.get(SharedConstants.JWT_REFRESH_TOKEN));

        return this.http.post<any>(this.OAUTH_TOKEN_ENDPOINT, body, {headers});
    }
}
