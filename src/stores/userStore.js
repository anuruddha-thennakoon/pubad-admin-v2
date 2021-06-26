import { observable, action } from 'mobx';
import userService from '../services/user.service';

class UserStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable request;
  @observable users;

  @action setRequset(data) {
    this.request = data;
  }

  @action register(userData) {
    this.inProgress = true;
    this.errors = undefined;

    return userService.addUser(userData)
      .then((data) => {
        // console.log(data);
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action getAllUsers() {
    this.inProgress = true;
    this.errors = undefined;

    return userService.allUsers()
      .then((users) => {
        this.users = users.data.resource;
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action updateUser(data){
    this.inProgress = true;
    this.errors = undefined;

    return userService.updateUser(data)
      .then((users) => {
        // console.log(data);
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

}

export default new UserStore();
