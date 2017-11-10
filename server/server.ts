import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from './api';
import * as routing from './middleware/routing.mw';
import * as cookieParser from 'cookie-parser';
import configurePassport from './config/passport';

let clientPath = path.join(__dirname, '../client');

let app = express();
configurePassport(app);
app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', routing.stateRouting);
console.log('Running...');
app.listen(3000);