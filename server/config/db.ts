import * as mysql from 'mysql';

export let pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

export function rows(procedureName: string, args: object) {
    return callProcedure(procedureName, args)
    .then(function(resultsets: any) {
        return resultsets[0];
    });
}

export function row(procedureName: string, args: object) {
    return callProcedure(procedureName, args)
    .then(function(resultsets: any) {
        return resultsets[0][0];
    });
}

export function empty(procedureName: string, args: object) {
    return callProcedure(procedureName, args)
    .then(function(){
        return;
    });
}

function callProcedure(procedureName: string, args: any) {
    return new Promise(function(resolve, reject) {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            } else {
                var placeholders = '';
                if (args && args.length > 0) {
                    for (var i = 0; i < args.length; i++) {
                        if (i === args.length - 1) {
                            placeholders += '?';
                        } else {
                            placeholders += '?,';
                        }
                    }
                }
                var callString = 'CALL ' + procedureName + '(' + placeholders + ');';
                connection.query(callString, args, function(err: object, resultsets: any) {
                    connection.release();
                    if (err){
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}