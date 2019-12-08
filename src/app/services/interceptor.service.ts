import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private injector: Injector) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(!req.headers) {
            // req.headers = new HttpHeaders()
            
            // req.headers.push(req.headers)
        } 

        return next.handle(req);

    }
 }