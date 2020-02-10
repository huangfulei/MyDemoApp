import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {LoadingIndicatorService} from "../loading-indicator/loading-indicator.service";
import {Oauth2Response} from "./oauth2-response";
import {SharedConstants} from "../../shared/constants/SharedConstants";
import {CookieService} from "ngx-cookie-service";
import {UserSessionService} from "../services/user-session.service";
import {isNotNull} from "../../shared/utility/common.utility";
import {GlobalData} from "../services/global-data";
import {Router} from "@angular/router";
import {UserTypeService} from "../services/user-type.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    public error: string;
    private returnUrl = '/home';

    constructor(
        private readonly fb: FormBuilder,
        private readonly loginService: LoginService,
        private readonly cookieService: CookieService,
        private readonly userSessionService: UserSessionService,
        private readonly userTypeService: UserTypeService,
        private readonly globalData: GlobalData,
        private readonly router: Router,
        private readonly loadingIndicatorService: LoadingIndicatorService) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    public onSubmit() {
        this.loadingIndicatorService.startLoading();
        let user = {email: this.f.email.value, password: this.f.password.value};
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.userSessionService.getAccessToken(user).subscribe(
            (data: Oauth2Response) => {
                console.log(data);
                this.cookieService.set(SharedConstants.JWT_TOKEN, data.access_token);
                this.cookieService.set(SharedConstants.JWT_REFRESH_TOKEN, data.refresh_token);

                // todo: change this to isNotNull(this.userService.getUser())
                if (this.globalData.getUser()) {
                    console.log('get user from user session');
                    this.globalData.setLoginStatus(true);
                    this.router.navigate([this.returnUrl]);
                } else {
                    console.log('get user from backend');
                    this.loginService.login(user).then((response: any) => {
                        console.log(response);
                        // todo: set user type for different view permission
                        if (isNotNull(response.login)) {
                            // this.userTypeService.setUserTypeToUser();
                            // set to global data so we can keep track and update the data
                            this.globalData.setUserSession(response.login);
                            this.globalData.setTotalNumberOfProducts(response.login.totalNumberOfProducts);
                            this.globalData.setLoginStatus(true);
                            // set to cookies so when user refresh page they stays
                            this.cookieService.set(SharedConstants.LOGIN_STATUS, 'true');
                            this.cookieService.set(SharedConstants.TOTAL_NUMBER_OF_PRODUCTS, response.login.totalNumberOfProducts);
                            this.router.navigate([this.returnUrl]);
                        } else {
                            // if it's null, backend is down send a system maintenance message
                            // this.userProfileConsoleLog();
                            //this.logoutService.sendUserToNoAccess();
                        }
                    }).catch((error) => {
                        console.error(error);
                        this.error = error.error.error_description;
                        this.loadingIndicatorService.finishLoading();
                    });
                }
                this.loadingIndicatorService.finishLoading();
            },
            (error => {
                console.log(error);
            }));
    }

    // Todo: display error message using common component
}
