import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private injector: Injector) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.indexOf('http') != 0) {
            if (environment.hasOwnProperty('headers') && environment) {
                for (const prop in environment) {
                    if (environment.hasOwnProperty(prop)) {
                        req = req.clone({ headers: req.headers.set(prop, environment[prop]) });
                    }
                }
            }
        }

        return next.handle(req);

    }
 }