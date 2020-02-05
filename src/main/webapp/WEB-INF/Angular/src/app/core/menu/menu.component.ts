import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../shared/model/user";
import {ProductService} from "../../product/product.service";
import {LoginService} from "../login/login.service";
import {UserSessionService} from "../services/user-session.service";
import {LogoutService} from "../services/logout.service";
import {CookieService} from "ngx-cookie-service";
import {SharedConstants} from "../../shared/constants/SharedConstants";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    public isLoggedIn: any = false;
    public itemsInCart: string;
    private user: User;

    constructor(private route: Router,
                private userSessionService: UserSessionService,
                private loginService: LoginService,
                private logoutService: LogoutService,
                private productService: ProductService,
                private cookieService: CookieService,
                private http: HttpClient) {
    }

    ngOnInit() {

        if (this.cookieService.get(SharedConstants.JWT_TOKEN)) {
            console.log('jwt is here');
            this.isLoggedIn = true;
        }

        this.userSessionService.getLoginStatus().subscribe(response => {
            console.log(response);
            this.isLoggedIn = response;
        });
        this.productService.updatedProduct.subscribe(product => {
            console.log(product);
            this.itemsInCart = String(product.totalNumber);

        })
    }

    public onLogOut() {
        this.isLoggedIn = false;
        this.route.navigate(['/home']);
        this.logoutService.sendUserToLogout();
    }

    test() {
        /*let headers =
            {
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Basic ' + btoa('Fulei:fulei-secret')
            };

        const body = new HttpParams()
            .set('client_id', 'Fulei')
            .set('grant_type', 'refresh_token')
            .set('refresh_token', this.cookieService.get(SharedConstants.JWT_REFRESH_TOKEN));

        console.log(this.cookieService.get(SharedConstants.JWT_REFRESH_TOKEN));
        this.http.post(APIUrlConstants.OAUTH_TOKEN, body, {headers})
            .subscribe((token:Oauth2Response)=>{
                console.log(token);
                this.cookieService.set(SharedConstants.JWT_TOKEN, token.access_token);
                this.cookieService.set(SharedConstants.JWT_REFRESH_TOKEN, token.access_token);
            });*/
    }
}
