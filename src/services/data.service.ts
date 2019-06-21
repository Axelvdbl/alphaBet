import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class DataService {

	headers: Headers;

	// baseURL = 'http://localhost:3000/api/v1';
	baseURL = 'https://prod-alpha-bet-api-v1.herokuapp.com/api/v1';

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

	getLetters() {
		let options = new RequestOptions({ headers: this.headers });
		return this.http.get(this.baseURL + '/letters', options)
		.map(this.extractData)
		.catch(this.handleError);
	}

	putLetter(letter) {
		let body = JSON.stringify({ letter: letter })
		let options = new RequestOptions({ headers: this.headers });
		return this.http.put(this.baseURL + '/letters/' + letter.id, body, options)
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
