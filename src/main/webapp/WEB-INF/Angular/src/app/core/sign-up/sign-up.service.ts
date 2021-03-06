import {Injectable} from '@angular/core';
import {CommonService} from "../services/common.service";
import {APIUrlConstants} from "../../shared/constants/APIUrlConstants";
import {Observable} from "rxjs";

@Injectable()
export class SignUpService extends CommonService {
    private readonly MODEL_NAME = 'signUp';
    private readonly SIGN_UP_ENDPOINT = APIUrlConstants.SIGN_UP;

    constructor() {
        super();
    }

    public signUp(userInfo: any): Observable<any> {
        return this.simplePost(this.SIGN_UP_ENDPOINT, userInfo, this.MODEL_NAME);
    }
}
