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
    console.log('create user in the proc');
    return rows('InsertUser', [firstname, lastname, email, password]);
}

export function updateUser(id: number, firstname: string, lastname: string, email: string, roll: string) {
    return db.rows('UpdateUser', [id, firstname, lastname, email, roll]);
}

export function destroyUser(id: number) {
    return db.empty('DeleteUser', [id]);
}