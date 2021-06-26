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
        appState.setRole(user.user.role_id);
        appState.setIsLogged(true);
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action requsetReset(requestData) {
    this.inProgress = true;
    this.errors = undefined;

    return authService.requsetReset(requestData)
      .then((user) => {
        appState.setUser(user.data.userid);
        this.userid = user.data.userid;
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action resetPassword(requestData) {
    this.inProgress = true;
    this.errors = undefined;

    return authService.resetPassword(requestData)
      .then((user) => {
        // this.userid = user.userid;
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action logout() {
    this.reset();
    appState.setToken(undefined);
    appState.setRole(undefined);
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
