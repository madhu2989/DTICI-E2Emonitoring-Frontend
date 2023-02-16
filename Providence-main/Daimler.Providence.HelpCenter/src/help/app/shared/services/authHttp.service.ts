import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdalService } from 'adal-angular4/adal.service';
import { Observable } from 'rxjs/Observable';

import { SecretService } from './secret.service';

interface RequestOptionsArgs {
    body?: any;
    headers?: HttpHeaders;
    observe?: any;
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: any;
    withCredentials?: boolean;
}

@Injectable()
export class AuthHttp {

    private authHeaders: HttpHeaders;
    private tokenResource: string;

    constructor(
        private http: HttpClient,
        private adalService: AdalService,
        private adalConfigService: SecretService,
    ) {
        this.tokenResource = this.adalConfigService.adalConfig.clientId;
    }

    private _setAuthHeaders(access_token, token_type = 'Bearer') {
        access_token = access_token || this.adalService.getCachedToken(this.adalConfigService.adalConfig.clientId);
        
        this.authHeaders = new HttpHeaders();
        this.authHeaders = this.authHeaders.append('Authorization', token_type + ' ' + access_token);
        this.authHeaders = this.authHeaders.append('Content-Type', 'application/json');
    }

    public _setRequestOptions(options?: RequestOptionsArgs) {
        if (options && options.hasOwnProperty('headers')) {
            options.headers = options.headers.append('Authorization', this.authHeaders.getAll('Authorization'));
        } else if (options) {
            options.headers = this.authHeaders;
        } else {
            options = ({ headers: this.authHeaders});
        }

        return options;
    }

    /**
   * Example of how you can make auth request using angulars http methods.
   * @param options if options are not supplied the default content type is application/json
   */
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        
        
        let token = this.adalService
            .acquireToken(this.tokenResource);

            this._setAuthHeaders(token);
            return this.http.get(url, this._setRequestOptions(options));    
            
            
            
            
            
           /*

            .flatMap((token) => {
                this._setAuthHeaders(token);
                return this.http.get(url, this._setRequestOptions(options));
            });*/
    }


    post(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
        let token = this.adalService
            .acquireToken(this.tokenResource);

            this._setAuthHeaders(token);

            return this.http.post(url, body, this._setRequestOptions(options));

        /*
        return this.adalService
            .acquireToken(this.tokenResource)
            .flatMap((token) => {
                this._setAuthHeaders(token);
                return this.http.post(url, body, this._setRequestOptions(options));
            });*/
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
        let token = this.adalService
            .acquireToken(this.tokenResource);

            this._setAuthHeaders(token);

            return this.http.put(url, body, this._setRequestOptions(options));
        /*
        return this.adalService
            .acquireToken(this.tokenResource)
            .flatMap((token) => {
                this._setAuthHeaders(token);
                return this.http.put(url, body, this._setRequestOptions(options));
            });*/
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        let token = this.adalService
            .acquireToken(this.tokenResource);

            this._setAuthHeaders(token);

            return this.http.delete(url, this._setRequestOptions(options));
        /*
        return this.adalService
            .acquireToken(this.tokenResource)
            .flatMap((token) => {
                this._setAuthHeaders(token);
                return this.http.delete(url, this._setRequestOptions(options));
            });*/
    }

}
