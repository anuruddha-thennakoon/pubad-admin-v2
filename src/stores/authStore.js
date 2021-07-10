import { observable, action } from 'mobx';
import jwt_decode from 'jwt-decode';

import authService from '../services/auth.service';
import appState from './appState';

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable userid = undefined;

  @action reset() {
    this.userid = '';
  }

  @action login(loginData) {
    this.inProgress = true;
    this.errors = undefined;

    return authService.login(loginData)
      .then((user) => {
        appState.setToken(user.session_token);
        appState.setUserData(user.user);
        appState.setUserRole(user.user.role_id);
        appState.setIsLogged(true);
      })
      .catch((err) => {
        throw err;
      })
  }

  @action requsetReset(requestData) {
    this.inProgress = true;
    this.errors = undefined;

    return authService.requsetReset(requestData)
      .then((user) => {
        appState.setUserId(user.data.userid);
        this.userid = user.data.userid;
      })
      .catch((err) => {
        throw err;
      })
  }

  @action resetPassword(requestData) {
    this.inProgress = true;
    this.errors = undefined;

    return authService.resetPassword(requestData)
      .then((user) => {
        // this.userid = user.userid;
      })
      .catch((err) => {
        throw err;
      })
  }

  @action logout() {
    this.reset();
    appState.setToken(undefined);
    appState.setUserRole(undefined);
    appState.setUserData(undefined);
    appState.setIsLogged(false);

    // localStorage.clear();
    return Promise.resolve();
  }

  @action checkLogin() {
    var jwt = window.localStorage.getItem('jwt');
    if (jwt) {
      var decoded = jwt_decode(jwt);
      if (Date.now() / 1000 > decoded.exp) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }

  }

}

export default new AuthStore();
