import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from 'src/environments/environment';
// import {NotifService} from '../services/notification/notification.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private injector: Injector) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('http') != 0) {
            if (environment.hasOwnProperty('apiBaseUrl') && environment.production) {
                req = req.clone({ url: environment.production + req.url });
            }

            if (environment.hasOwnProperty('headers') && environment.production) {
                for (const prop in environment) {
                    if (environment.production.hasOwnProperty(prop)) {
                        req = req.clone({ headers: req.headers.set(prop, environment.production[prop]) });
                    }
                }
            }
        }

        // return next.handle(req).catch(this.catchErrors());
        return next.handle(req);//.catch(this.catchErrors());

    }
}