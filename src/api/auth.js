import axios from 'axios';

export function login(username, password) {
    return axios.post('/login', {
        email: username,
        password: password
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
            console.log(error);
        });
}
