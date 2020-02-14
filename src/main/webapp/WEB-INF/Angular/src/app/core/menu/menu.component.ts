import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LogoutService} from "../services/logout.service";
import {CookieService} from "ngx-cookie-service";
import {SharedConstants} from "../../shared/constants/SharedConstants";
import {GlobalData} from "../services/global-data";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    public isLoggedIn: any = false;
    public totalNumberOfProducts: number;

    constructor(private route: Router,
                private readonly globalData: GlobalData,
                private logoutService: LogoutService,
                private cookieService: CookieService) {
    }

    ngOnInit() {

        console.log(this.cookieService.get(SharedConstants.LOGIN_STATUS));
        // when load the app check cookies for user
        if (this.cookieService.get(SharedConstants.LOGIN_STATUS) == 'true') {
            console.log('login true');
            this.isLoggedIn = true;
            this.totalNumberOfProducts = +this.cookieService.get(SharedConstants.TOTAL_NUMBER_OF_PRODUCTS)
        }
        console.log(this.globalData.getUser());

        // when browser stays, and user logged out and login again
        this.globalData.getLoginStatus().subscribe(response => {
            console.log(response);
            this.isLoggedIn = response;
            if (this.isLoggedIn) {
                this.cookieService.set(SharedConstants.LOGIN_STATUS, 'true');
                console.log(this.globalData.getUser());
                this.totalNumberOfProducts = this.globalData.getUser().totalNumberOfProducts;
            }
        });

        // whenever update the total value set to cookies
        this.globalData.getTotalNumberOfProducts().subscribe(data => {
            this.totalNumberOfProducts = data;
            this.cookieService.set(SharedConstants.TOTAL_NUMBER_OF_PRODUCTS, String(data));
        })


    }

    public onLogOut() {
        this.isLoggedIn = false;
        this.route.navigate(['/home']);
        this.logoutService.sendUserToLogout();
    }

}
