import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

    private user_id: string;


    constructor() {
        }


    public getUser(): string {
        return this.user_id;
    }

    public setUser(user_id: string) {
        this.user_id = user_id;
    }

}


