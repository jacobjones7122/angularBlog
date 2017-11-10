import * as db from '../config/db';

export function all() {
    return db.rows('GetBlogs', []);
}

export function read(id: number) {
    return db.row('GetSinglePost', [id]);
}

export function update(id: number, title: string, categoryid: number, content: string) {
    console.log(id, title, categoryid, content);
    return db.rows('UpdatePost', [id, title, categoryid, content]);
}

export function create(title: string, userid: number, categoryid: number, content: string) {
    return db.rows('InsertPost', [title, userid, categoryid, content]);
}

export function destroy(id: number) {
    return db.empty('DeletePost', [id]);
}