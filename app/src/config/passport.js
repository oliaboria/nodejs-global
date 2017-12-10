import passport from 'passport';
import { Strategy } from 'passport-local';

import users from '../models/users';

passport.use(new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    ((username, password, done) => {
        const user = users.find(user => user.email === username && user.password === password);

        if (user) {
            done(null, user);
        } else {
            done(null, false, { message: 'Not Found' });
        }
    })
));