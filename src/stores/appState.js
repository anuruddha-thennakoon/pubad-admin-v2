import { observable, action, reaction } from 'mobx';
import appService from '../services/app.service';

class AppState {
  @observable authenticated;
  @observable authenticating;

  @observable token;
  @observable role;
  @observable isLogged = false;
  @observable userData;
  @observable dashboardData;
  @observable userId;

  constructor() {
    this.authenticated = false;
    this.authenticating = false;

    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      },
    );

    reaction(
      () => this.role,
      role => {
        if (role) {
          window.localStorage.setItem('role', role);
        } else {
          window.localStorage.removeItem('role');
        }
      },
    );

    reaction(
      () => this.userData,
      userData => {
        if (userData) {
          window.localStorage.setItem('userData', JSON.stringify(userData));
        } else {
          window.localStorage.removeItem('userData');
        }
      },
    );

    reaction(
      () => this.isLogged,
      isLogged => {
        if (isLogged) {
          window.localStorage.setItem('isLogged', isLogged);
        } else {
          window.localStorage.removeItem('isLogged');
        }
      },
    );

  }

  @action authenticate() {
    return new Promise((resolve, reject) => {
      this.authenticating = true;

      setTimeout(() => {
        this.authenticated = !this.authenticated;
        this.authenticating = false;

        resolve(this.authenticated);
      }, 0);
    });
  }

  @action setUser(id) {
    this.userId = id;
  }

  @action getUser() {
    return this.userId;
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setRole(role) {
    this.role = role;
  }

  @action setUserData(data) {
    this.userData = data;
  }

  @action setIsLogged(data) {
    this.isLogged = data;
  }

}

export default new AppState();