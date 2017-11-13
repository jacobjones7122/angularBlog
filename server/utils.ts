// import * as bcrypt from 'bcrypt';

// const SALT_ROUNDS = 12;

// export function encryptPassword(pw: string): Promise<string> {
//     console.log(pw);
//     console.log(bcrypt.hash(pw, SALT_ROUNDS));
//     return bcrypt.hash(pw, SALT_ROUNDS);
// }

// export function checkPassword(pw: string, hash: string): Promise<boolean> {
//     console.log('This is the hash' + hash);
//     console.log('This is the pw' + pw);
//     console.log(bcrypt.compare(pw, hash));  
//     return bcrypt.compare(pw, hash);   
// }