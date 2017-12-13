import passport from 'passport';
import { Strategy } from 'passport-local';

import authHelper from '../common/helpers/authHelper';

passport.use(new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    ((username, password, done) => {
        const user = authHelper.isAuthorized(username, password);

        if (user) {
            done(null, user);
        } else {
            done(null, false, { message: 'Not Found' });
        }
    })
));