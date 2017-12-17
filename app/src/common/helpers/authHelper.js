import { User } from '../../models/models';

function isAuthorized(email, password) {
    return User
        .all()
        .then((users) => {
            return users.find(user => user.email === email && user.password === password);
        });
}

export default {
    isAuthorized
};