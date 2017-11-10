import * as db from '../config/db';

export function all() {
    return db.rows('GetCategories', []);
}