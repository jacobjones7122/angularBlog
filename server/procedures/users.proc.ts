import {row, rows, empty} from '../config/db';

import * as db from '../config/db';

export function all() {
    return db.rows('GetUsers', []);
}

export function readByEmail(email: string): Promise<models.Iusers> {
    return row('GetUserByEmail', [email]);
}

export function read(id: number): Promise<models.Iusers> {
    return row('GetUser', [id]);
}

export function createUser(firstname: string, lastname: string, email: string, password: string): Promise<models.Iusers> {
    console.log('in the proc');
    console.log(firstname, lastname, email, password);
    return rows('InsertUser', [firstname, lastname, email, password]);
}

export function updateUser(id: number, firstname: string, lastname: string, email: string) {
    return db.rows('UpdateUser', [id, firstname, lastname, email]);
}

export function destroyUser(id: number) {
    console.log('Here in the Delete Procedure!')
    return db.empty('DeleteUser', [id]);
}