import User from '../models/user';

function isAuthorized(email, password) {
    return User.find({ email: email, password: password }, function(user) {
        if (err) {
            return false;
        }

        return !!user;
    });
}

export default {
    isAuthorized
};