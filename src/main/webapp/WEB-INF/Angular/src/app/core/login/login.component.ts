import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {LoadingIndicatorService} from "../loading-indicator/loading-indicator.service";
import {Oauth2Response} from "./oauth2-response";
import {SharedConstants} from "../../shared/constants/SharedConstants";
import {CookieService} from "ngx-cookie-service";
import {UserSessionService} from "../services/user-session.service";
import {isNotNull, isNull} from "../../shared/utility/common.utility";
import {GlobalData} from "../services/global-data";
import {Router} from "@angular/router";

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
        private readonly userService: UserSessionService,
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
        let user = {user:{email: this.f.email.value, password: this.f.password.value}};
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loginService.loginUser(user).subscribe(
            (data: Oauth2Response) => {
                console.log(data);
                this.cookieService.set(SharedConstants.JWT_TOKEN, data.access_token);
                this.cookieService.set(SharedConstants.JWT_REFRESH_TOKEN, data.refresh_token);
            },
            (error) => {
                console.log(error);
                this.error = error.error.error_description;
                this.loadingIndicatorService.finishLoading();
            },
            () => {
                // todo: change this to isNotNull(this.userService.getUser())
                if (false) {
                    this.userService.setLoginStatus(true);
                    this.router.navigate([this.returnUrl]);
                    this.loadingIndicatorService.finishLoading();
                } else {
                    this.userService.getUserSession(user).then((response: any) => {
                        console.log(response);
                        this.globalData.user = response;
                        console.log(this.globalData.user);
                        // this.userTypeService.setUserTypeToUser();
                        if (isNotNull(response)) {
                            this.userService.setUserSession(response);
                        } else {
                            // this.userProfileConsoleLog();
                        }
                        // return true to indicate successful login
                        if (isNull(this.globalData.user)) {
                            console.error('No User Profile from Security Service!');
                            //this.logoutService.sendUserToNoAccess();
                        } else {
                            this.router.navigate([this.returnUrl]);
                            this.userService.setLoginStatus(true);
                        }
                        this.loadingIndicatorService.finishLoading();
                    }).catch((error) => {
                        console.error(error);
                        this.error = error.error.error_description;
                        this.loadingIndicatorService.finishLoading();
                    });
                }
            });
    }

    // Todo: display error message using common component
}
