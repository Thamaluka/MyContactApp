import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})


export class PersonService {
    endpoint = 'http://localhost:3000/';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })

    };

    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    createPerson(body): Observable<any> {
        return this.http.post(this.endpoint + 'person/create', JSON.stringify(body), this.httpOptions).pipe(
            map(this.extractData)
        );
    }

    getAllContacts(): Observable<any> {
        return this.http.get(this.endpoint + 'people/contacts', this.httpOptions).pipe(
            map(this.extractData));
    }

    getPersonById(id): Observable<any> {
        const params = new HttpParams({
            fromObject: {
                id: id
            }
        });
        return this.http.get(this.endpoint + 'person', { params: params }).pipe(
            map(this.extractData));
    }



    deleteContact(id): Observable<any> {
        const params = new HttpParams({
            fromObject: {
                id: id
            }
        });
        return this.http.delete(this.endpoint + 'person', { params: params }).pipe(
            map(this.extractData));
    }


}