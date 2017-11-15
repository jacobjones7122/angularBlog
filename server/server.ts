import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from './api';
import * as routing from './middleware/routing.mw';
import * as cookieParser from 'cookie-parser';
import configurePassport from './config/passport';
const prerender = require('prerender-node');
prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
prerender.set('prerenderSerciveUrl', 'http://localhost:1337/');

let clientPath = path.join(__dirname, '../client');

let app = express();
configurePassport(app);
app.use(express.static(clientPath));
app.use(prerender);
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', routing.stateRouting);

app.listen(process.env.PORT || 3000, () => {
    console.log('Running...');
});