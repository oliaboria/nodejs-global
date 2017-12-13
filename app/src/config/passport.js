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

        return authHelper.isAuthorized(username, password)
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Not Found' });
                }
            })
            .catch((error) => done(null, false, { message: 'Not Found' }));
    })
));