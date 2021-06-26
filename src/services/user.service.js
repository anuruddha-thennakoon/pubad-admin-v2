import axios from 'axios';
import api from '../utils/api';

class UserService {

    addUser(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.CREATE_USER, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    updateUser(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.UPDATE_USER, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    allUsers() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.USERS)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }
}

export default new UserService();