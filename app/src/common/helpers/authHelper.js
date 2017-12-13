import users from '../../models/users';

function isAuthorized(email, password) {
    return users.find(user => user.email === email && user.password === password);
}

export default {
    isAuthorized
};