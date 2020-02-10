import {Injectable} from "@angular/core";
import {SharedConstants} from "../../shared/constants/SharedConstants";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {APIUrlConstants} from "../../shared/constants/APIUrlConstants";
import {CookieService} from "ngx-cookie-service";
import {CommonService} from "./common.service";
import {isNotEmptyArray, isNotNull, isNull} from "../../shared/utility/common.utility";
import {Permission} from "../../shared/model/permission";
import {GlobalData} from "./global-data";

@Injectable({
    providedIn: 'root'
})
export class UserSessionService extends CommonService {
    private readonly OAUTH_TOKEN_ENDPOINT = APIUrlConstants.OAUTH_TOKEN;
    headers = {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa('Fulei:fulei-secret')
    };

    constructor(private readonly cookieService: CookieService,
                private readonly globalData: GlobalData) {
        super();
    }

    // todo: use it
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

    // todo: use it
    private getUserPermissionList(): Observable<any> {
        if (isNotNull(this.globalData.getUser())) {
            return this.globalData.getUser().permissionList;
        }
    }

    public getAccessToken(user: { email: string, password: string }): Observable<any> {
        // let options = { headers: headers };
        const body = new HttpParams()
            .set('username', user.email)
            .set('password', user.password)
            .set('grant_type', 'password');

        return this.simplePost(this.OAUTH_TOKEN_ENDPOINT, body, null, {headers: this.headers});
    }

    public refreshToken(): Observable<any> {
        const body = new HttpParams()
            .set('client_id', 'Fulei')
            .set('grant_type', 'refresh_token')
            .set('refresh_token', this.cookieService.get(SharedConstants.JWT_REFRESH_TOKEN));

        return this.simplePost(this.OAUTH_TOKEN_ENDPOINT, body, null, {headers: this.headers});
    }
}
