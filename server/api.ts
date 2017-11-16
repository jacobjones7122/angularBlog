import * as express from 'express';
import posts from './controllers/posts.ctrl';
import users from './controllers/users.ctrl';
import categories from './controllers/categories.ctrl';
import contactForm from './controllers/contactform.ctrl';

let router = express.Router();

router.use('/posts', posts);
router.use('/users', users);
router.use('/categories', categories);
router.use('/contactforms', contactForm);

export default router;