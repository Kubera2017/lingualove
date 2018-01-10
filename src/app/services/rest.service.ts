import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Settings } from '../settings';

import { UsersService } from './users.service';




@Injectable()
export class RESTService {

    private apiUrl = Settings.apiUrl;

    constructor(
        private http: HttpClient,
        private user: UsersService) {
        }


    public getWords(): Observable<any> {
        const url = this.apiUrl + `/api/users/${this.user.getUser()}`;
        return this.http
        .get(url);
    }

    public getWord(_id: string): Observable<any> {
        const url = `/api/words/${_id}`;
        return this.http
        .get(url);
    }

    public addWord(word: any): Observable<any> {
        const url = this.apiUrl + `/api/users/${this.user.getUser()}`;
        const body = word;
        return this.http
        .post(url, body,
            {
                headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
            });
    }

    public updateWord(word: any): Observable<any> {
        const url = `/api/words/${word._id}`;
        const body = word;
        return this.http
        .put(url, body,
            {
                headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
            });
    }

    public deleteWord(_id: string): Observable<any> {
        const url = this.apiUrl + `/api/users/${this.user.getUser()}/words/${_id}`;
        return this.http
        .delete(url);
    }

    public writeResult(_id: any, lesson: any): Observable<any> {
        const url = `/api/words/${_id}`;
        const body = lesson;
        return this.http
        .post(url, body,
            {
                headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
            });
    }

/* Users */

    public getUsers(): Observable<any> {
        const url = this.apiUrl + '/api/users';
        return this.http
        .get(url);
    }

    public addUser(user: any): Observable<any> {
        const url = `/api/users`;
        const body = user;
        return this.http
        .post(url, body,
            {
                headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
            });
    }

/* Test */

    public getWordSet(): Observable<any> {
        const url = this.apiUrl + `/api/users/${this.user.getUser()}/test`;
        return this.http
        .get(url);
    }

}


