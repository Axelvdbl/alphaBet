import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class AuthService {

	headers: Headers;

	// baseURL = 'http://localhost:3000/api/v1/auth_user';
	baseURL = 'https://prod-alphabet-api.herokuapp.com/api/v1/auth_user';

  constructor (private http: Http) {
		this.setHeaders();
	}

	setHeaders() {
		this.headers = new Headers(
			{
				'Content-Type': 'application/json',
				'access_token': localStorage.getItem('access_token'),
				'client': localStorage.getItem('client'),
				'uid': localStorage.getItem('uid'),
				'expiry': localStorage.getItem('expiry'),
				'token-type': localStorage.getItem('token-type'),
			}
		);
	}

	validateToken(){
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.baseURL + '/validate_token', options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  login(email, password){
    let body = JSON.stringify({ email: email, password: password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseURL + '/sign_in', body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  createAccount(user){
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseURL, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  resetPassword(email){
    let redirect_url = "https://prod-alpha-bet.herokuapp.com/api/v1/password_users"
    let body = JSON.stringify({ email: email, redirect_url: redirect_url });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseURL + '/password', body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

	putPassword(new_pass, new_pass_confirmation){
		let body = JSON.stringify({password: new_pass, password_confirmation: new_pass_confirmation});
		let options = new RequestOptions({ headers: this.headers });
		return this.http.put(this.baseURL + '/password', body, options)
										.map(this.extractData)
										.catch(this.handleError);
	}

  logOut(){
    let options = new RequestOptions({ headers: this.headers });
    return this.http.delete(this.baseURL + '/sign_out', options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

	/* Handle response */

  private extractData(res: Response) {
    let headers = res.headers
    let body = res.json();
    return {body: body, headers: headers} || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error._body ? `${error._body}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
