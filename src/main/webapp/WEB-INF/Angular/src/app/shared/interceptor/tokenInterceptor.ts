import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {CookieService} from "ngx-cookie-service";
import {LogoutService} from "../../core/services/logout.service";
import {SharedConstants} from "../constants/SharedConstants";
import {isNull} from "../utility/common.utility";
import {Oauth2Response} from "../../core/login/oauth2-response";
import {UserSessionService} from "../../core/services/user-session.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


    constructor(private readonly userSessionService: UserSessionService,
                private readonly cookieService: CookieService,
                private readonly logoutService: LogoutService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this.getToken();
        if (token && !this.isRefreshing) {
            req = this.addToken(req, token);
        }

        // setting the accept header
        req = req.clone({
            headers: req.headers.set('Accept', 'application/json')
                .set('Cache-Control', 'no-cache')
                .set('Pragma', 'no-cache')
                .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        });

        return next.handle(req).pipe(
            catchError((err: any, caught) => {
                console.log('error caught in interceptor', err);
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        return this.handle401Error(req, next);
                        // Welp, somehow we got a 401, kick em over to the logout screen
                        // this.logoutService.sendUserToLogout();
                    }
                }
                return throwError(err);
            }));

    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.userSessionService.refreshToken().pipe(
                tap((token: Oauth2Response) => {
                    this.cookieService.set(SharedConstants.JWT_TOKEN, token.access_token);
                    this.cookieService.set(SharedConstants.JWT_REFRESH_TOKEN, token.refresh_token);
                }),
                switchMap((token: Oauth2Response) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.access_token);
                    return next.handle(this.addToken(request, token.access_token));
                }),
            );

        } else {
            this.isRefreshing = false;
            this.logoutService.sendUserToLogout();
            /*return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));*/
        }
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)});
    }

    private getToken(): string {
        const token = this.cookieService.get(SharedConstants.JWT_TOKEN);
        if (isNull(token)) {
            console.log('No token from cookie');
        }
        return token;
    }
}
