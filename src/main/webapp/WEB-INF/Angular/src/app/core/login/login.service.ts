import {Injectable} from '@angular/core';
import {APIUrlConstants} from "../../shared/constants/APIUrlConstants";
import {CommonService} from "../services/common.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService extends CommonService {
    private readonly MODEL_NAME = 'login';
    private readonly LOGIN_ENDPOINT = APIUrlConstants.LOG_IN;
    private readonly OAUTH_TOKEN_ENDPOINT = APIUrlConstants.OAUTH_TOKEN;

    constructor() {
        super();
        super.setApiEndpoint(this.LOGIN_ENDPOINT);
        super.setModelName(this.MODEL_NAME);
    }

    public login(user): Promise<any> {
        // Fetch User session from the common controller
        return this.simplePost(this.LOGIN_ENDPOINT, user, this.MODEL_NAME).toPromise();
    }
}
